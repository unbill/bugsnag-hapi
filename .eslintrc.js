module.exports = {
  extends: ['standard', 'eslint:recommended', 'plugin:node/recommended'],
  rules: {
    // disable rules from base configurations
    'no-console': 'off',
    'linebreak-style': 'off',
    indent: 'off'
  },
  parserOptions: {
    ecmaVersion: 2018
  },

  env: {
    node: true,
    es6: true
  }
}
