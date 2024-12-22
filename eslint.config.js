import myConfig from 'eslint-config-ultraq';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
	...myConfig,
	reactPlugin.configs.flat.recommended,
	{
		ignores: [
			'coverage/**/*',
			'dist/**/*'
		]
	},
	{
		languageOptions: {
			ecmaVersion: 2020,
			globals: {
				...globals.browser,
				...globals.jest,
				...globals.node
			},
			sourceType: 'module'
		},
		rules: {
			'import/namespace': 'off' // Disabled, reporting parsing errors
		},
		settings: {
			react: {
				version: 'detect'
			}
		}
	}
];
