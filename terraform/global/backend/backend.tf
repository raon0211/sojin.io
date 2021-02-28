terraform {
  backend "s3" {
    bucket = "raon0211-terraform-state"
    key = "global/backend/terraform.tfstate"
    region = "ap-northeast-2"

    dynamodb_table = "raon0211-terraform-state-global-backend"
    encrypt = true
  }
}
