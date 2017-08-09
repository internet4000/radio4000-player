import alias from 'rollup-plugin-alias'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import nodeResolve from 'rollup-plugin-node-resolve'
import nodeGlobals from 'rollup-plugin-node-globals'
import babel from 'rollup-plugin-babel'
import vue from 'rollup-plugin-vue'

export default {
	entry: 'src/main.js',
	// We want UMD so it works in the browser and node.
	format: 'umd',
	moduleName: 'radio4000player',
	sourceMap: false,
	plugins: [
		alias({
			// See https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
			vue$: 'vue/dist/vue.esm.js'
		}),
		vue({
			// Inject styles as inline <style>. Otherwise it will output a bundle.css
			css: true
		}),
		// Allow imports from node_modules.
		nodeResolve({
			browser: true,
			main: true,
			jsnext: true
		}),
		// Convert CommonJS modules to ES2015, when needed.
		commonjs(),
		replace({
			// See https://vuejs.org/v2/guide/deployment.html#With-Build-Tools
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
		}),
		// Do not rely on node utils in browser environment.
		nodeGlobals(),
		babel({
			exclude: 'node_modules/**'
		})
	],
	dest: 'dist/radio4000-player.js'
}
