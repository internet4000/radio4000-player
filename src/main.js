import Vue from 'vue'
import vueCustomElement from 'vue-custom-element'
// Polyfill "custom elements". See https://github.com/WebReflection/document-register-element.
import 'document-register-element/build/document-register-element'
import PlayerData from './PlayerData.vue'

Vue.config.devtools = true

// Register our Vue commponent as the <radio4000-player> element.
Vue.use(vueCustomElement)
Vue.customElement('radio4000-player', PlayerData, {
	shadow: false
})
