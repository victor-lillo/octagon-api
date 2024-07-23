import globals from 'globals'
import astroParser from 'astro-eslint-parser'
import svelteParser from 'svelte-eslint-parser'
import eslintPluginSvelte from 'eslint-plugin-svelte'
import tseslint from 'typescript-eslint'
import tsParser from '@typescript-eslint/parser'
import eslintPluginAstro from 'eslint-plugin-astro'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default [
  {
    ignores: ['**/*.d.ts', 'dist/*'],
  },
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginSvelte.configs['flat/recommended'],
  ...tseslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  {
    files: ['**/*.astro'],

    languageOptions: {
      parser: astroParser,
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },

    rules: {
      'astro/no-unused-css-selector': 'error',
      'astro/prefer-object-class-list': 'error',
    },
  },
  {
    files: ['**/*.svelte'],

    languageOptions: {
      parser: svelteParser,
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        parser: {
          ts: '@typescript-eslint/parser',
          js: 'espree',
          typescript: '@typescript-eslint/parser',
        },
      },
    },

    rules: {
      'svelte/no-target-blank': 'error',
      'svelte/button-has-type': 'warn',

      'svelte/html-self-closing': [
        'error',
        {
          void: 'always',
          component: 'always',
          svelte: 'always',
        },
      ],
    },
  },
  {
    files: ['**/*.ts'],

    languageOptions: {
      parser: tsParser,
    },

    rules: {
      '@typescript-eslint/ban-tslint-comment': 'error',
    },
  },
  {
    files: ['**/*.astro/*.js', '*.astro/*.js'],

    languageOptions: {
      parser: tsParser,
    },
  },
]
