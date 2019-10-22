module.exports = {
  extends: ['react-app'],
  env: {
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 9, // or 7,8,9
  },
  plugins: ['react-hooks'],
  globals: {
    React: 'writable',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
