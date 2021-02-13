import { APIGatewayProxyEventV2 } from 'aws-lambda'

export function parseAPIGatewayProxyEvent(event: APIGatewayProxyEventV2) {
  const method = event.requestContext.http.method
  const path = `/${event.pathParameters?.proxy ?? ''}?${event.rawQueryString}`

  const headers = event.headers
  const cookies = event.cookies
  headers['cookie'] = cookies?.join('; ') ?? ''

  const body =
    event.body == null
      ? Buffer.alloc(0)
      : event.isBase64Encoded
      ? Buffer.from(event.body, 'base64')
      : Buffer.from(event.body)

  return {
    method,
    path,
    headers,
    body,
  }
}
