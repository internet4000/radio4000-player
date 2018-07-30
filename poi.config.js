module.exports = {
	// Use UMD format so you can use in <script> tags.
	format: 'umd',
	moduleName: 'radio4000Player',
	filename: {
		js: 'radio4000-player.min.js'
	},
	css: {
		// Don't extract CSS into standalone files.
		extract: false
	},

	// Development settings
	port: 4002,
	html: {
		template: 'index.html'
	}
}
