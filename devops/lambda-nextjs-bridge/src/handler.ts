import { Server } from 'http'
import { APIGatewayProxyEventV2, Context } from 'aws-lambda'
import { AddressInfo } from 'net'
import { parseAPIGatewayProxyEvent } from './events'
import { requestToAPIGateway } from './remotes'

interface LaunchOptions {
  server: Server
}

export function createHandler({ server }: LaunchOptions) {
  const addr = prepareAddress(server)

  return async function handler(
    event: APIGatewayProxyEventV2,
    context: Context
  ) {
    context.callbackWaitsForEmptyEventLoop = false

    const { address, port } = await addr.get()
    const { body, headers, method, path } = parseAPIGatewayProxyEvent(event)

    const response = await requestToAPIGateway({
      hostname: address,
      port,
      headers,
      method,
      path,
      body,
    })

    return response
  }
}

function prepareAddress(server: Server) {
  const promise = new Promise<AddressInfo>((resolve, reject) => {
    server.listen(
      {
        host: '127.0.0.1',
        port: 0,
      },
      () => {
        const address = server.address()

        if (typeof address === 'object' && address != null) {
          resolve(address)
        } else {
          reject(
            new Error(`Unexpected address received: ${JSON.stringify(address)}`)
          )
        }
      }
    )
  })

  return { get: () => promise }
}
