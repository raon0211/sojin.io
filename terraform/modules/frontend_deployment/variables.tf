variable "domain_name" {
  description = "Domain name on which the blog will be served"
  type = string
}

variable "region" {
  description = "The AWS region on which the infrastructure will be created"
  type = string
  default = "ap-northeast-2"
}
