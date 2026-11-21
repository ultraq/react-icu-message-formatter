import {babel} from '@rollup/plugin-babel';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import {defineConfig} from 'rollup';

export default defineConfig({
	input: 'source/IcuMessageFormatter.js',
	output: [
		{
			file: 'dist/react-icu-message-formatter.js',
			format: 'es',
			sourcemap: true
		}
	],
	plugins: [
		babel({
			babelHelpers: 'runtime',
			presets: [
				'@babel/preset-react'
			],
			plugins: [
				'@babel/plugin-transform-runtime'
			]
		}),
		nodeResolve({
			browser: true
		}),
		terser()
	],
	external: [
		/@babel\/runtime/,
		'@ultraq/string-utils',
		'@ultraq/icu-message-formatter',
		'react'
	]
});
