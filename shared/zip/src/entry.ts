import { compressBuffer } from '@sojin/buffer'
import crc32 from 'buffer-crc32'

export interface DeflatedZipEntry {
  type: 'deflated'
  compressedBuffer: Buffer
  uncompressedSize: number
  mode: number
  crc32: number
}

export interface UncompressedZipEntry {
  type: 'uncompressed'
  buffer: Buffer
  mode: number
}

export type ZipEntry = DeflatedZipEntry | UncompressedZipEntry

interface ZipEntryOptions {
  buffer: Buffer
  mode: number
}

export function createZipEntryFromBuffer({
  buffer,
  mode,
}: ZipEntryOptions): UncompressedZipEntry {
  return {
    type: 'uncompressed',
    buffer,
    mode,
  }
}

export async function compressZipEntry(
  entry: UncompressedZipEntry
): Promise<DeflatedZipEntry> {
  const compressedBuffer = await compressBuffer(entry.buffer)

  return {
    type: 'deflated',
    compressedBuffer,
    uncompressedSize: entry.buffer.byteLength,
    mode: entry.mode,
    crc32: crc32.unsigned(entry.buffer),
  }
}
