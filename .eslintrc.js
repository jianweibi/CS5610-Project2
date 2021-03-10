module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jquery: true,
  },
  ignorePatterns: ['/public/assets/**'],
  extends: ['eslint:recommended', 'google', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {},
};
