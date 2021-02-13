import {
  IncomingHttpHeaders,
  OutgoingHttpHeaders,
  request,
  RequestOptions,
} from 'http'

interface Response {
  statusCode: number
  headers: IncomingHttpHeaders
  body: Buffer
}

export interface SendRequestOptions extends RequestOptions {
  body?: Buffer
}

export function sendRequest({ headers, body, ...options }: SendRequestOptions) {
  return new Promise<Response>((resolve, reject) => {
    const req = request(
      { ...options, headers: cleanRequestHeaders(headers) },
      (response) => {
        const chunks: Buffer[] = []

        response.on('data', (chunk) => {
          chunks.push(Buffer.from(chunk))
        })

        response.on('error', reject)

        response.on('end', () => {
          resolve({
            body: Buffer.concat(chunks),
            headers: response.headers,
            statusCode: response.statusCode ?? 200,
          })
        })
      }
    )

    req.on('error', reject)

    if (body != null) {
      req.write(body)
    }

    req.end()
  })
}

export { sendRequest as request }

function cleanRequestHeaders(headers: OutgoingHttpHeaders | undefined) {
  const result: OutgoingHttpHeaders = {}

  for (const key in headers) {
    const value = headers[key]

    // Clean `undefined` values in headers
    if (value === undefined) {
      continue
    }

    result[key] = value
  }

  return result
}
