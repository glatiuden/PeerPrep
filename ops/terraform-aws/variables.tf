variable "aws_region" {
  default = "ap-southeast-1"
}

variable "cluster-name" {
  default = "terraform-eks"
  type    = string
}

variable "acm_certificate" {
  default = "arn:aws:acm:us-east-1:694217600744:certificate/1a3e4bc5-9bf3-4e15-910e-efd9a52aeb29"
  type    = string
}

variable "route53_zone_id" {
  default = "Z05163112UOX9JLLI0Y2"
  type    = string
}

variable "account_id" {
  default = "694217600744"
  type    = string
}
