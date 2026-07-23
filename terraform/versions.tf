terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }
  }
}

# CloudFront is a global service, but the AWS provider still needs a region
# for API calls (S3 bucket, ACM lookups if ever added, etc.).
provider "aws" {
  region = var.aws_region
}
