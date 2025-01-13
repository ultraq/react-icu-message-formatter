import {babel} from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import {defineConfig} from 'rollup';

export default defineConfig({
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
			babelHelpers: 'runtime',
			presets: [
				'@babel/preset-react'
			],
			plugins: [
				'@babel/plugin-transform-runtime'
			]
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
});
