module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:compat/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'array-element-newline': ['error', 'consistent'],
    'array-bracket-newline': ['error', 'consistent'],
    'react/display-name': [0],
    // disable the rule for all files
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  // overrides: [
  //   {
  //     // enable the rule specifically for TypeScript files
  //     files: ['*.ts', '*.tsx'],
  //     rules: {
  //       "@typescript-eslint/explicit-function-return-type": [
  //         'warn', {
  //           allowExpressions: true,
  //           allowTypedFunctionExpressions: true,
  //         }
  //       ],
  //     },
  //   },
  // ],
  settings: {
    react: {
      version: 'latest',
    },
  },
  ignorePatterns: [
    'razzle.config.js',
  ],
};
