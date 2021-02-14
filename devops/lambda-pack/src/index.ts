import path from 'path'
import fs from 'fs'
import { LambdaToPack } from './models'
import { packLambdasToZip } from './pack'

interface PackOptions {
  nextJSServiceRoot: string
}

export async function packNextServerlessPages({
  nextJSServiceRoot,
}: PackOptions) {
  const lambdasToPack = await readPagesManifest({ nextJSServiceRoot })
  await packLambdasToZip(lambdasToPack)
}

async function readPagesManifest({
  nextJSServiceRoot,
}: Pick<PackOptions, 'nextJSServiceRoot'>): Promise<LambdaToPack[]> {
  const manifestPath = path.join(
    nextJSServiceRoot,
    '.next',
    'serverless',
    'pages-manifest.json'
  )

  const buffer = await fs.promises.readFile(manifestPath)

  const manifest: Record<string, string> = JSON.parse(buffer.toString('utf8'))

  return Object.entries(manifest).map(([route, filePath]) => {
    return {
      route,
      filepath: path.resolve(path.dirname(manifestPath), filePath),
    }
  })
}
