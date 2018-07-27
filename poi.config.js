// poi.config.js
module.exports = {
	port: 4002,
	html: {
		template: 'index.html'
	},
	extractCSS: false,
	filename: {
		js: 'radio4000-player.min.js'
	},

	// Don't split bundle in two files
	vendor: false,

	// Package as UMD module.
	format: 'umd',
	moduleName: 'radio4000Player',

	transformModules: ['media-url-parser'],

	webpack(config) {
		// Exclude `url` module and rely on global in browsers.
		var isProduction = process.env.NODE_ENV === 'production'
		if (isProduction) {
			config.externals = {
				url: 'URL'
			}
		}

		return config
	}
}
