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
      test: ['./components', './services'],
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
