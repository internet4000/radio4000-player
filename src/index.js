// Polyfill "custom elements". See https://github.com/WebReflection/document-register-element.
import 'document-register-element'

import Vue from 'vue'
import vueCustomElement from 'vue-custom-element'
import Radio4000Player from './Radio4000Player.vue'

Vue.config.devtools = true
Vue.config.productionTip = false

// Register our Vue commponent as the <radio4000-player> element.
Vue.use(vueCustomElement)
Vue.customElement('radio4000-player', Radio4000Player, {
	shadow: false,

	// Element is mounted/inserted into document.
	connectedCallback() {
		const dispatchReadyEvent = () => {
			let event = new Event('playerReady')
			this.dispatchEvent(event)
		}

		// Catch the internal ready event and emit our own event.
		this.addEventListener('vce-ready', dispatchReadyEvent)
	}
})
