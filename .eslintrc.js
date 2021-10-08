const {off} = require("./renderer/.next/static/chunks/main");
module.exports = {
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['react', '@typescript-eslint'],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'linebreak-style': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/button-has-type': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    "no-console": 'off',
    'react-hooks/exhaustive-deps': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
