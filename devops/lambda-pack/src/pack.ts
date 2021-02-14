import { LambdaToPack, PackedLambda } from './models'
import { compressZipEntry, createZipEntryFromBuffer, Zip } from '@sojin/zip'
import { readFile } from './read-file'
import path from 'path'
import { buildHandlerScript } from './handler'

const NORMAL_FILE_MODE = 0o100644

export async function packLambdasToZip(lambdas: LambdaToPack[]) {
  const zip = new Zip()
  const pages: PackedLambda[] = []

  await Promise.all(
    lambdas.map(async (lambda) => {
      const { buffer, mode } = await readFile(lambda.filepath)
      const entry = createZipEntryFromBuffer({
        buffer,
        mode,
      })

      const zipPath = path.join(`lambdas`, normalizeRoute(lambda.route))
      zip.addEntry(zipPath, await compressZipEntry(entry))

      pages.push({
        route: lambda.route,
        requirePath: path.join('.', zipPath),
      })
    })
  )

  const { functionName, script } = await buildHandlerScript(pages)
  const entry = createZipEntryFromBuffer({
    buffer: Buffer.from(script),
    mode: NORMAL_FILE_MODE,
  })

  const handlerName = 'handler'
  zip.addEntry(`${handlerName}.js`, await compressZipEntry(entry))

  return {
    handlerName,
    functionName,
    buffer: await zip.toBuffer(),
  }
}

function normalizeRoute(route: string) {
  if (route === '/') {
    return '/index.js'
  } else {
    return `${route}.js`
  }
}
