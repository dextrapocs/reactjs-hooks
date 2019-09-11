module.exports = {
  root: true,

  extends: ['airbnb-base', 'plugin:react/recommended'],

  plugins: ['no-wildcard-postmessage', 'no-unsanitized', 'security', 'scanjs-rules', 'react'],

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },

  env: {
    browser: true,
    es6: true
  },

  rules: {
    'max-len': ['error', { code: 120 }]
  }
};
