resource "aws_cloudfront_response_headers_policy" "security_headers_policy" {
  name = "PeerPrepSecurityHeadersPolicy"
  security_headers_config {
    content_type_options {
      override = true
    }
    frame_options {
      frame_option = "DENY"
      override     = true
    }
    referrer_policy {
      referrer_policy = "same-origin"
      override        = true
    }
    xss_protection {
      mode_block = true
      protection = true
      override   = true
    }
    strict_transport_security {
      access_control_max_age_sec = "63072000"
      include_subdomains         = true
      preload                    = true
      override                   = true
    }
    content_security_policy {
      content_security_policy = "default-src 'none'; script-src 'unsafe-inline' 'self'; script-src-elem 'unsafe-inline' 'self'; script-src-attr 'self'; style-src 'unsafe-inline' 'self' fonts.googleapis.com; style-src-elem 'unsafe-inline' 'self' fonts.googleapis.com; style-src-attr 'unsafe-inline' 'self' fonts.googleapis.com; img-src 'self' data:; font-src 'self' fonts.gstatic.com; connect-src 'self' server.peerprep.tech; media-src 'self' data:; object-src 'self'; prefetch-src 'self'; child-src 'self'; frame-src 'self'; worker-src 'self'; frame-ancestors 'none'; form-action 'self'; base-uri 'self'; manifest-src 'self' manifest.json; report-uri; report-to"
      override                = true
    }
  }
}

data "aws_cloudfront_cache_policy" "this" {
  name = "Managed-CachingOptimized"
}
