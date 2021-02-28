resource "aws_s3_bucket" "this" {
  bucket = var.domain_name
  acl = "private"

  versioning {
    enabled = true
  }
}

resource "aws_s3_bucket_policy" "this" {
  bucket = aws_s3_bucket.this
  policy = aws_iam_policy_document.s3_policy.json
}

data "aws_iam_policy_document" "s3_policy" {
	statement {
		sid = "1"
		effect = "Allow"
		principals {
			type = "AWS"
			identifiers = [
				aws_cloudfront_origin_access_identity.this.iam_arn
			]
		}
		actions = [
			"s3:GetObject"
		]
		resources = [
			"${aws_s3_bucket.this.arn}/*"
		]
	}
}
