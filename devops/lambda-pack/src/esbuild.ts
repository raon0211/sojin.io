import { escapeRegExp } from '@sojin/regex'
import { PluginBuild } from 'esbuild'

export function excludeExternalPlugin(externals: string[]) {
  return {
    name: '@sojin/exclude-externals',
    setup(build: PluginBuild) {
      build.onResolve(
        { filter: new RegExp(`^(${externals.map(escapeRegExp).join('|')})$`) },
        () => {
          return {
            external: true,
          }
        }
      )
    },
  }
}

export function resolveBridgePlugin() {
  return {
    name: '@sojin/resolve-bridge',
    setup(build: PluginBuild) {
      build.onResolve(
        { filter: new RegExp(`^@sojin-devops\\/lambda-nextjs-bridge$`) },
        () => {
          return {
            namespace: 'pnp',
            path: require.resolve('@sojin-devops/lambda-nextjs-bridge'),
          }
        }
      )
    },
  }
}
