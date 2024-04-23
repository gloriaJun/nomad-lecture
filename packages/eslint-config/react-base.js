const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [require.resolve('./base.js')],
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  overrides: [
    {
      files: ['*.tsx', '*.jsx'],
      extends: ['plugin:react/recommended'],
      plugins: ['react', 'react-hooks'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        'react/sort-comp': [
          2,
          {
            order: [
              'constructor',
              'static-methods',
              'lifecycle',
              '/^(on|handle).+$/',
              'everything-else',
              'rendering',
            ],
            groups: {
              rendering: ['/^render.+$/', 'render'],
            },
          },
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
      },
    },
    {
      files: ['*.stories.ts', '*.stories.tsx', '*.stories.js', '*.stories.jsx'],
      extends: ['plugin:storybook/recommended'],
      rules: {},
    },
  ],
};
