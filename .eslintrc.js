module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-extra-boolean-cast': 0,
    'arrow-body-style': 1,
    'no-console': 0,
    'max-len': 0,
    'no-underscore-dangle': 0,
    'react/prop-types': 1,
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'implicit-arrow-linebreak': 0,
    'operator-linebreak': 0,
    'no-unused-vars': 1,
    'linebreak-style': 0,
    'object-curly-newline': [
      'off',
      {
        ImportDeclaration: { minProperties: 3, consistent: false, multiline: true },
      },
    ],
    'import/prefer-default-export': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
};
