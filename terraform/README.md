# Deploying flight-booking-frontend to S3 + CloudFront

This is an **additional** deployment target — the existing Vercel deployment
stays live and untouched. This provisions a private S3 bucket for the built
static assets, fronted by a CloudFront distribution, in **us-east-1**.

## Why CloudFront in front of S3, and why it also proxies the API

The backend (ECS/ALB, see `flight-booking-BE/terraform/`) is HTTP-only with no
ACM certificate. Serving the frontend over HTTPS via CloudFront while having
the browser call the ALB directly over HTTP would either fail as mixed
content (browser blocks HTTP calls from an HTTPS page) or force the frontend
onto HTTP too. Instead:

- **Default behavior** (`/*`) → S3 origin via **Origin Access Control (OAC)**.
  The bucket has no public access and no static-website-hosting mode; only
  CloudFront (scoped to this specific distribution's ARN) can read objects.
- **`/api/v1/*` behavior** → the ALB as a second, custom HTTP origin.
  CloudFront terminates HTTPS for the browser and proxies these requests to
  the ALB over plain HTTP internally. The browser only ever talks to
  CloudFront over HTTPS — it never sees or calls the ALB's HTTP URL directly.

`VITE_API_BASE_URL=/api/v1` (see `../.env.production`) makes the frontend call
the same origin it's served from, so this all works with zero CORS
configuration needed on the backend.

## What gets created

- S3 bucket (private, `BucketOwnerEnforced`, all public access blocked)
- CloudFront Origin Access Control + bucket policy scoped to this distribution
- CloudFront distribution:
  - Default behavior → S3, `Managed-CachingOptimized`, 403/404 → `/index.html` (200) for SPA client-side routing
  - `/api/v1/*` behavior → ALB, `Managed-CachingDisabled`, `Managed-AllViewerExceptHostHeader` (forwards all headers including `Authorization`, all query strings, all methods)
  - Default `*.cloudfront.net` certificate (no custom domain)

Not included: no custom domain/ACM cert (none requested), no WAF, no logging bucket.

## Prerequisites

- Terraform >= 1.5, AWS CLI v2, Node/npm
- AWS credentials with permissions for S3, CloudFront, and IAM policy documents

## 1. Set the production API URL

Already done in `../.env.production`:

```
VITE_API_BASE_URL=/api/v1
```

This only affects `npm run build` (Vite production mode) — local `npm run dev`
still uses `../.env` (`http://localhost:3000/api/v1`), unaffected.

## 2. Provision the infrastructure

```bash
cd terraform
terraform init
terraform validate
terraform plan
terraform apply
```

Review the plan before applying — check that the S3 bucket has no public
access and that the ALB origin is only reachable through the `/api/v1/*`
CloudFront behavior (CloudFront itself doesn't restrict who can call the ALB
directly over the internet; the ALB's own security group is what actually
guards it — see `flight-booking-BE/terraform/security_groups.tf`).

## 3. Build and deploy the frontend

```bash
cd ..
npm run build

BUCKET=$(cd terraform && terraform output -raw s3_bucket_name)
DIST_ID=$(cd terraform && terraform output -raw cloudfront_distribution_id)

aws s3 sync dist/ "s3://$BUCKET" --delete

aws cloudfront create-invalidation --distribution-id "$DIST_ID" --paths "/*"
```

## 4. Wait for CloudFront to deploy

A new distribution or config change takes **5–15 minutes** to propagate to
all edge locations:

```bash
aws cloudfront wait distribution-deployed --id "$DIST_ID"
```

## 5. Verify

```bash
terraform -chdir=terraform output cloudfront_url
```

Open that URL — the frontend should render, and any API call (e.g. the login
screen, or `/api/v1/health`) should succeed with no CORS or mixed-content
errors in the browser console, since everything goes through the single
HTTPS CloudFront origin.

## Updating the frontend

```bash
npm run build
aws s3 sync dist/ "s3://$BUCKET" --delete
aws cloudfront create-invalidation --distribution-id "$DIST_ID" --paths "/*"
```

## Tearing down

```bash
cd terraform
terraform destroy
```

S3 buckets with objects in them can't be destroyed by Terraform directly —
empty the bucket first (`aws s3 rm "s3://$BUCKET" --recursive`) or Terraform
will error on the `aws_s3_bucket` deletion.
