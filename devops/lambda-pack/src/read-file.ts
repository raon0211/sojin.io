import fs from 'fs'
import { getBufferFromStream } from '@sojin/buffer'
import { Sema } from 'async-sema'

// To prevent EMFILE (Too many file handles open) error
const MAX_CONCURRENCY = 20
const maxConcurrencySema = new Sema(MAX_CONCURRENCY)

export async function readFile(filepath: string) {
  await maxConcurrencySema.acquire()

  const stream = fs.createReadStream(filepath)

  const [buffer, stat] = await Promise.all([
    getBufferFromStream(stream),
    fs.promises.lstat(filepath),
  ])

  try {
    return {
      buffer,
      mode: stat.mode,
    }
  } finally {
    stream.close()
    maxConcurrencySema.release()
  }
}
