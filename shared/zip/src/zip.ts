import { getBufferFromStream } from '@sojin/buffer'
import { ZipFile } from 'yazl'
import { ZipEntry } from './entry'

const mtime = new Date(0)

export class Zip {
  private zipfile = new ZipFile()

  public async addEntry(name: string, entry: ZipEntry) {
    switch (entry.type) {
      case 'uncompressed':
        this.zipfile.addBuffer(entry.buffer, name, {
          mode: entry.mode,
          mtime,
        })

        return {
          addedBytes: entry.buffer.length,
        }
      case 'deflated':
        this.zipfile.addDeflatedBuffer(entry.compressedBuffer, name, {
          crc32: entry.crc32,
          uncompressedSize: entry.uncompressedSize,
          mode: entry.mode,
        })

        return {
          addedBytes: entry.compressedBuffer.length,
        }
    }
  }

  public toStream() {
    this.zipfile.end()

    return this.zipfile.outputStream
  }

  public async toBuffer() {
    return await getBufferFromStream(this.toStream())
  }
}
