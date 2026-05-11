import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:astro/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: '.',
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.astro']
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      },
      rules: {
        // Astro-specific rules
      }
    }
  ],
  rules: {
    // Custom rules
  }
});
