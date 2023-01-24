module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    "@typescript-eslint/no-non-null-assertion": 0,
  },
  ignorePatterns: ['**/client/dist', '**/client/ssr-dist', '**/server/dist', '*.css', '*.scss', '*.json'],
}
