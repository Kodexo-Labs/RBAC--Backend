module.exports = {
    env: {
      browser: true,
      commonjs: true,
      es2021: true,
    },
    extends: ['airbnb-base'],
    parserOptions: {
      ecmaVersion: 12,
    },
    rules: {
      'comma-dangle': 'off',
      'linebreak-style': 0,
      indent: 'off',
      camelcase: [
        0,
        {
          properties: 'never',
        },
      ],
      'operator-linebreak': ['error', 'after'],
      'no-underscore-dangle': 'off',
      'object-curly-newline': [
        'error',
        {
          ObjectExpression: { consistent: true, multiline: true },
          ObjectPattern: { consistent: true, multiline: true },
          ImportDeclaration: 'never',
          ExportDeclaration: { multiline: true, minProperties: 3 },
        },
      ],
      'no-shadow': [
        'error',
        {
          hoist: 'functions',
          builtinGlobals: true,
        },
      ],
    },
  };
  