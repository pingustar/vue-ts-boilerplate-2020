module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript',
  ],

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'max-len': ['error', { 'code': 120 }],
    'class-methods-use-this': 'off',
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
  },

  'extends': [
    'plugin:vue/recommended',
    '@vue/airbnb',
    '@vue/typescript'
  ]
};
