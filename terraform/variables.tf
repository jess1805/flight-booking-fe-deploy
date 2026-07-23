variable "aws_region" {
  description = "AWS region for the S3 bucket (CloudFront itself is global)"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Name prefix applied to all resources"
  type        = string
  default     = "flight-booking"
}

variable "environment" {
  description = "Deployment environment tag"
  type        = string
  default     = "production"
}

# ---- Backend origin (pre-existing ECS/ALB deployment, not managed here) ----

variable "alb_origin_domain" {
  description = "DNS name of the backend Application Load Balancer (HTTP only, no ACM cert)"
  type        = string
  default     = "flight-booking-alb-337360694.us-east-1.elb.amazonaws.com"
}

variable "api_path_pattern" {
  description = "CloudFront cache-behavior path pattern proxied to the ALB origin"
  type        = string
  default     = "/api/v1/*"
}

# ---- CloudFront tuning ----

variable "price_class" {
  description = "CloudFront price class (PriceClass_100 = US/Canada/Europe only, cheapest)"
  type        = string
  default     = "PriceClass_100"
}
