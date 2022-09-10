import { build } from 'esbuild'
import browserslistToEsbuild from 'browserslist-to-esbuild'

build({
	entryPoints : ['tests/lib/index.mjs'],
	outfile     : 'tests/demo/demo.min.js',
	bundle      : true,
	minify      : true,
	sourcemap   : true,
	target      : browserslistToEsbuild(),
}).catch(() => process.exit(1));