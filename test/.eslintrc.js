module.exports = {
  extends: ['plugin:jest/recommended'],
  plugins: ['jest'],

  env: {
    node: true,
    es6: true,
    'jest/globals': true
  }
}
