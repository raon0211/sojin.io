const pnpapi = require('pnpapi')

const INTERNAL_PACKAGE_SCOPES = [
  '@sojin/',
  '@sojin-components/',
  '@sojin-services/',
]

module.exports = {
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-numeric-separator',
  ],
  overrides: [
    {
      test: (value) => {
        const locator = pnpapi.findPackageLocator(value)
        const name = locator != null ? locator.name : undefined

        if (name != null) {
          return INTERNAL_PACKAGE_SCOPES.some((scope) => name.startsWith(scope))
        } else {
          return false
        }
      },
      plugins: ['@emotion/babel-plugin'],
      presets: [
        [
          '@babel/preset-react',
          {
            runtime: 'automatic',
            importSource: '@emotion/react',
          },
        ],
      ],
    },
  ],
}
