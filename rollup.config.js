import {babel} from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';

export default {
	input: 'source/IcuMessageFormatter.js',
	output: [
		{
			file: `lib/react-icu-message-formatter.cjs.js`,
			format: 'cjs',
			sourcemap: true
		},
		{
			file: `lib/react-icu-message-formatter.es.js`,
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
		'@ultraq/array-utils',
		'@ultraq/string-utils',
		'@ultraq/icu-message-formatter',
		'prop-types'
	]
};
