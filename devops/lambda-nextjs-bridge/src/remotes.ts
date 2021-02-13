import { IncomingHttpHeaders } from 'http'
import { request, SendRequestOptions } from './client'

export async function requestToAPIGateway(options: SendRequestOptions) {
  const { headers: responseHeaders, body, ...response } = await request(options)
  const { headers, cookies } = handleHeaders(responseHeaders)

  return {
    ...response,
    headers,
    cookies,
    body: body.toString('base64'),
    encoding: 'base64',
  }
}

function handleHeaders(headers: IncomingHttpHeaders) {
  const result: Record<string, string> = {}
  const cookies: string[] = []

  for (const key in headers) {
    const value = headers[key]

    if (value == null) {
      continue
    }

    switch (key) {
      case 'content-length': {
        // Since API Gateway handles content-length automatically,
        // we simply ignore it
        continue
      }
      case 'set-cookie': {
        if (Array.isArray(value)) {
          cookies.push(...value)
        } else {
          cookies.push(value)
        }
        break
      }
      default: {
        if (Array.isArray(value)) {
          result[key] = value.join(', ')
        } else {
          result[key] = value
        }
      }
    }
  }

  return { headers: result, cookies }
}
