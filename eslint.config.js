import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import css from '@eslint/css'
import { defineConfig } from 'eslint/config'
import autoImportConfig from './.eslintrc-auto-import.json' assert { type: 'json' }

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'], languageOptions: { globals: globals.browser } },
  { files: ['**/database/**/*.{js,mjs,cjs}'], languageOptions: { globals: { ...globals.node } } },
  tseslint.configs.recommended,
  // Use the TypeScript ESLint config instead of Vue plugin configs
  { languageOptions: { globals: autoImportConfig.globals } },
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  { files: ['**/*.css'], plugins: { css }, language: 'css/css', extends: ['css/recommended'] },
  // Custom rules without using Vue plugin configs
  {
    files: ['**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-refs': 'off',
    },
  },
])