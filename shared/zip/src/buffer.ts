export function getBufferFromStream(stream: NodeJS.ReadableStream) {
  return new Promise((resolve, reject) => {
    const buffers: Buffer[] = []

    stream.on('error', (err: Error) => {
      reject(err)
    })

    stream.on('data', (buffer: Buffer) => {
      buffers.push(buffer)
    })

    stream.on('end', () => {
      resolve(Buffer.concat(buffers))
    })
  })
}
