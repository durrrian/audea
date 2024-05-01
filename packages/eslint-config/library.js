const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

/*
 * This is a custom ESLint configuration for use with
 * typescript packages.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: ['@vercel/style-guide/eslint/node', '@vercel/style-guide/eslint/typescript'].map(require.resolve),
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
      node: {
        extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',

    'no-console': ['error', { allow: ['warn', 'error'] }],

    '@typescript-eslint/no-unsafe-assignment': 'off',

    // Safety with promises so we aren't running with scissors
    'no-promise-executor-return': 'error',
    'prefer-promise-reject-errors': 'error',
    'require-atomic-updates': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: { attributes: false } }],
    '@typescript-eslint/promise-function-async': 'error',
    '@typescript-eslint/require-await': 'error',
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  tagDefinitions: [
    {
      tagName: '@type',
      syntaxKind: 'block',
    },
  ],
  supportForTags: {
    '@type': true,
  },
}
