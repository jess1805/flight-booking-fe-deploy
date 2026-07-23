output "cloudfront_domain_name" {
  description = "Default *.cloudfront.net domain name"
  value       = aws_cloudfront_distribution.frontend.domain_name
}

output "cloudfront_url" {
  description = "Public HTTPS URL for the frontend"
  value       = "https://${aws_cloudfront_distribution.frontend.domain_name}"
}

output "cloudfront_distribution_id" {
  description = "Distribution ID, needed for cache invalidations"
  value       = aws_cloudfront_distribution.frontend.id
}

output "s3_bucket_name" {
  description = "Name of the private S3 bucket holding the built frontend"
  value       = aws_s3_bucket.frontend.bucket
}
