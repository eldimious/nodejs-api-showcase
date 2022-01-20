module.exports = {
  root: true,
  extends: [
    'eslint-config-airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-underscore-dangle': [2, { allowAfterThis: true }],
    'class-methods-use-this': 0,
    strict: 0,
    'max-len': 0,
    'new-cap': ['error', { newIsCapExceptionPattern: '^errors\..' }],
    'import/prefer-default-export': 'off',
    'no-useless-constructor': 'off',
    'import/extensions': 'off',
  },
};
