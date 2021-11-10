# Create S3 Bucket
resource "aws_s3_bucket" "admin_peerprep_bucket" {
  bucket = "admin.peerprep.tech"
  acl = "private"
  tags = {
    Environment = "Production"
  }

  website {
    index_document = "index.html"
  }
}

# OAI for S3 Bucket and Cloudfront
resource "aws_cloudfront_origin_access_identity" "admin_origin_access_identity" {
  comment = "CloudFront Identity for admin.peerprep.tech"
}

# Policy Document
data "aws_iam_policy_document" "admin_policy_document" {
  statement {
    sid       = "1"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.admin_peerprep_bucket.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.admin_origin_access_identity.iam_arn]
    }
  }

  statement {
    sid       = "2"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.admin_peerprep_bucket.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.admin_origin_access_identity.iam_arn]
    }
  }

  statement {
    sid       = "3"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.admin_peerprep_bucket.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.admin_origin_access_identity.iam_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.admin_peerprep_bucket.id
  policy = data.aws_iam_policy_document.admin_policy_document.json
}

# Configure Cloudfront
locals {
  # bucket origin id
  s3_origin_id = "S3-${aws_s3_bucket.admin_peerprep_bucket.id}"
}

resource "aws_cloudfront_distribution" "s3_admin_distribution" {
  origin {
    domain_name = "admin.peerprep.tech.s3.ap-southeast-1.amazonaws.com"
    origin_id   = local.s3_origin_id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.admin_origin_access_identity.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  aliases = ["admin.peerprep.tech"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id
    response_headers_policy_id = aws_cloudfront_response_headers_policy.security_headers_policy.id
    cache_policy_id            = data.aws_cloudfront_cache_policy.this.id
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
    compress               = true
  }

  price_class = "PriceClass_All"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = {
    Environment = "production"
  }

  viewer_certificate {
    acm_certificate_arn = var.acm_certificate
    ssl_support_method = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  custom_error_response {
    error_code = 403
    error_caching_min_ttl = 10
    response_page_path = "/index.html"
    response_code = 200
  }
}

# Configure Route 53
resource "aws_route53_record" "admin_cloudfront" {
  zone_id = var.route53_zone_id
  name    = "admin.peerprep.tech"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.s3_admin_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_admin_distribution.hosted_zone_id
    evaluate_target_health = true
  }
}
