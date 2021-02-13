import { constants, deflateRaw, ZlibOptions } from 'zlib'

export function compressBuffer(
  buffer: Buffer,
  { level = constants.Z_BEST_COMPRESSION, ...options }: ZlibOptions = {}
) {
  return new Promise<Buffer>((resolve, reject) => {
    deflateRaw(
      buffer,
      {
        level,
        ...options,
      },
      (err, compressedBuffer) => {
        if (err != null) {
          reject(err)
        } else {
          resolve(compressedBuffer)
        }
      }
    )
  })
}
