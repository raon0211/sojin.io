const path = require('path')

module.exports = {
  stories: ['../**/*.stories.@(js|mdx|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-knobs'],
  webpack: (config) => {
    config.resolve.alias['core-js'] = path.dirname(require.resolve('core-js'))
    config.resolve.alias['regenerator-runtime'] = path.dirname(
      require.resolve('regenerator-runtime')
    )

    config.resolve.alias['@emotion/core'] = path.dirname(
      require.resolve('@emotion/react')
    )
    config.resolve.alias['emotion-theming'] = path.dirname(
      require.resolve('@emotion/react')
    )
    config.resolve.alias['@emotion/styled-base'] = path.dirname(
      require.resolve('@emotion/styled/base')
    )

    return config
  },
  babel: (config) => {
    for (const preset of config.presets) {
      if (!Array.isArray(preset)) {
        continue
      }

      const [name, options] = preset

      // FIXME:
      // Make unified babel.config.js work with storybook
      if (name.includes('preset-react')) {
        options.runtime = 'automatic'
        options.importSource = '@emotion/react'
      }
    }

    return config
  },
}
