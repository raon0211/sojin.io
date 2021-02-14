import { nodeFileTrace, NodeFileTraceOptions } from '@vercel/nft'
import builtins from 'builtin-modules'
import resolveDefault from '@vercel/nft/out/resolve-dependency'
import { Job } from '@vercel/nft/out/node-file-trace'
import { PnpApi } from '@yarnpkg/pnp'
import { findPnpApi } from 'module'

declare module 'module' {
  export const findPnpApi: ((importer: string) => PnpApi) | undefined
}

export async function traceFiles(
  target: string[],
  options: NodeFileTraceOptions
) {
  const result = await nodeFileTrace(target, {
    resolve,
    ...options,
  })

  return result
}

function resolve(
  dependency: string,
  parent: string,
  job: Job,
  isCommonJS: boolean
) {
  if (builtins.includes(dependency)) {
    return `node:${dependency}`
  }

  const pnpResolved = resolveWithPnp(dependency, parent, job, isCommonJS)

  if (pnpResolved != null) {
    return pnpResolved
  }

  const defaultResolved = resolveDefault(dependency, parent, job, isCommonJS)

  if (defaultResolved != null) {
    return defaultResolved
  }

  throw new NotFoundError({ dependency, parent })
}

function resolveWithPnp(...args: Parameters<typeof resolveDefault>) {
  if (findPnpApi == null) {
    return undefined
  }

  const [dependency, parent, job] = args

  // FIXME(@raon0211):
  // @vercel/nft always ignores workspace dependency links in pnp
  // (e.g. ../../.yarn/$$virtual/@sojin-utils-virtual-2efcf1e706/1/shared/utils/src/index.ts)
  // since ignoring parent directories is hard-coded in the source
  // @see https://github.com/vercel/nft/blob/a35dca73afe296b9df28a6e13caa861a76c9e908/src/node-file-trace.ts#L94
  job.ignoreFn = () => false

  const pnpapi = findPnpApi(parent)
  const resolved = pnpapi.resolveRequest(dependency, parent, {
    considerBuiltins: true,
  })

  if (resolved != null) {
    return resolved
  }

  throw new NotFoundError({ dependency, parent })
}

class NotFoundError extends Error {
  constructor({ dependency, parent }: { dependency: string; parent: string }) {
    super(`Could not resolve dependency '${dependency}' from '${parent}'`)
  }
}
