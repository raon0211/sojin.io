import { build } from 'esbuild'
import { pnpPlugin } from '@yarnpkg/esbuild-plugin-pnp'
import { excludeExternalPlugin, resolveBridgePlugin } from './esbuild'
import { PackedLambda } from './models'

export async function buildHandlerScript(pages: PackedLambda[]) {
  const functionName = 'handle'

  const script = buildHandlerBase(functionName, pages)
  const external = Object.values(pages).map((x) => x.requirePath)

  const built = await build({
    stdin: {
      contents: script,
      loader: 'ts',
    },
    platform: 'node',
    plugins: [
      excludeExternalPlugin(external),
      resolveBridgePlugin(),
      pnpPlugin(),
    ],
    external,
    bundle: true,
    write: false,
  })

  return {
    functionName,
    script: built.outputFiles[0].contents,
  }
}

function buildHandlerBase(funcName: string, pages: PackedLambda[]) {
  return `
import { Server } from 'http'
import url from 'url'
import { createHandler } from '@sojin-devops/lambda-nextjs-bridge'

const pages = {
  ${pages
    .map(({ route, requirePath }) => {
      return `[${JSON.stringify(route)}]: () => require(${JSON.stringify(
        requirePath
      )}),`
    })
    .join('\n')}
}

const server = new Server((req, res) => {
  try {
    const pageToRender = url.parse(req.url)
    const page = pages[pageToRender]()
  
    page.render(req, res)
  } catch (e) {
    console.error(e.stack)
  }
})

exports[${JSON.stringify(funcName)}] = createHandler(server)
`.trim()
}
