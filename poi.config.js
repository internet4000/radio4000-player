module.exports = {
	output: {
		// Don't clean the "dist" directory,
		// because we commit the files to git.
		clean: false,
		// Use UMD format so you can use the player in <script> tags.
		format: 'umd',
		moduleName: 'radio4000Player',
		fileNames: {
			js: 'radio4000-player.min.js'
		},
		html: {
			template: './index.html'
		}
	},
	css: {
		// Don't extract CSS into standalone files.
		extract: false
	},

	devServer: {
		port: 4002
	}
}
