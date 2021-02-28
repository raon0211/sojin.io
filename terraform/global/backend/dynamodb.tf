locals {
  table_names = [
    "raon0211-terraform-state-services-blog",
    "raon0211-terraform-state-global-backend",
  ]
}

resource "aws_dynamodb_table" "terraform_lock" {
  for_each = toset(local.table_names)

  name = each.value
  billing_mode = "PAY_PER_REQUEST"
  hash_key = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}
