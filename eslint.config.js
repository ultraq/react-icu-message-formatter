// @ts-check
import eslintReact from '@eslint-react/eslint-plugin';
import {defineConfig} from 'eslint/config';
import myConfig from 'eslint-config-ultraq';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig({
	extends: [
		...myConfig,
		tseslint.configs.recommended,
		eslintReact.configs['recommended-typescript']
	],
	ignores: [
		'coverage/**/*',
		'dist/**/*'
	],
	languageOptions: {
		ecmaVersion: 2022,
		globals: {
			...globals.browser,
			...globals.node,
			...globals.vitest
		},
		sourceType: 'module'
	},
	rules: {
		'@eslint-react/no-array-index-key': 'off',
		'@eslint-react/no-context-provider': 'off',
		'@eslint-react/no-use-context': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'jsdoc/require-param': 'off',
		'jsdoc/require-param-type': 'off',
		'jsdoc/require-returns': 'off',
		'prefer-const': 'off'
	},
	settings: {
		'import/resolver': 'eslint-import-resolver-typescript',
		react: {
			version: 'detect'
		}
	}
});
