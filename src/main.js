import Vue from 'vue'
import vueCustomElement from 'vue-custom-element'
import 'document-register-element/build/document-register-element'
import Radio4000Player from './Radio4000Player.vue'

Vue.use(vueCustomElement)

// Register <radio4000-player> element to our Vue component.
Vue.customElement('radio4000-player', Radio4000Player, {
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
