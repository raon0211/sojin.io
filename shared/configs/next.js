// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const ROOT_PATH = path.resolve(__dirname, '..', '..')
const SHARED_PATH = path.join(ROOT_PATH, 'shared')
const COMPONENTS_PATH = path.join(ROOT_PATH, 'components')

module.exports = {
  target: 'serverless',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      include: (filePath) => {
        return (
          filePath.startsWith(SHARED_PATH) ||
          filePath.startsWith(COMPONENTS_PATH) ||
          filePath.includes('@sojin')
        )
      },
      use: {
        loader: require.resolve('babel-loader'),
        options: {
          rootMode: 'upward',
        },
      },
    })

    return config
  },
}
