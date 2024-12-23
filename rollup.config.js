import {babel} from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
	input: 'source/IcuMessageFormatter.js',
	output: [
		{
			file: 'dist/react-icu-message-formatter.cjs',
			format: 'cjs',
			sourcemap: true
		},
		{
			file: 'dist/react-icu-message-formatter.js',
			format: 'es',
			sourcemap: true
		}
	],
	plugins: [
		babel({
			babelHelpers: 'runtime'
		}),
		commonjs(),
		nodeResolve()
	],
	external: [
		/@babel\/runtime/,
		'@ultraq/string-utils',
		'@ultraq/icu-message-formatter',
		'react'
	]
};
