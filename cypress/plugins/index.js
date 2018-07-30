// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const webpack = require('@cypress/webpack-preprocessor')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const webpackOptions = {
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.css$/,
				use: ['vue-style-loader', 'css-loader']
			}
		]
	},
	plugins: [new VueLoaderPlugin()]
}

const options = {
	// send options from your webpack.config.js, so it works the same as your app's code
	webpackOptions,
	watchOptions: {}
}

module.exports = (on, config) => {
	// `on` is used to hook into various events Cypress emits
	// `config` is the resolved Cypress config

	// Tell Cypress how to load .Vue files.
	on('file:preprocessor', webpack(options))
}
