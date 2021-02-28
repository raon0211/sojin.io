terraform {
  backend "s3" {
    bucket = "raon0211-terraform-state"
    key = "services/blog/terraform.tfstate"
    region = "ap-northeast-2"

    dynamodb_table = "raon0211-terraform-state-services-blog"
    encrypt = true
  }
}

module "frontend_deployment" {
  source = "../../modules/frontend_deployment"

  domain = "blog.sojin.io"
  region = "ap-northeast-2"
}
