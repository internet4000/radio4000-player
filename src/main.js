import 'babel-polyfill'
import Vue from 'vue'
import vueCustomElement from 'vue-custom-element'
import 'document-register-element/build/document-register-element'
import PlayerData from './PlayerData.vue'

Vue.use(vueCustomElement)

// Register our Vue commponent as the <radio4000-player> element.
Vue.customElement('radio4000-player', PlayerData, {
	// Enable shadow DOM.
	shadow: false

	// To use shadow CSS, it has to be inlined here.
	// See https://github.com/karol-f/vue-custom-element/issues/17
	// shadowCss: `
	// 	article {
	// 		background-color: red;
	// 	}
	// `
})
