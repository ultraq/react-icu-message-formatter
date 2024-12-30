import {resolve} from 'path';

import {defineConfig} from 'vite';

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'source/IcuMessageFormatter.js'),
			formats: ['es', 'cjs'],
			fileName: 'icu-message-formatter'
		},
		sourcemap: true,
		rollupOptions: {
			external: [
				'@ultraq/string-utils',
				'@ultraq/icu-message-formatter',
				'react'
			]
		}
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./vitest.setup.js'],
		coverage: {
			enabled: true
		}
	}
});
