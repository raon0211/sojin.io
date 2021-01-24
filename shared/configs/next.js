// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const ROOT_PATH = path.resolve(__dirname, '..', '..')

module.exports = {
  target: 'serverless',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      include: (filePath) => {
        return filePath.startsWith(path.join(ROOT_PATH, 'shared'))
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
