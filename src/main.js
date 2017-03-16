import Vue from 'vue'
import App from './App.vue'

new Vue({
 	el: '#radio4000-player',
  render(h) {
		let attr = this.$el.attributes.slug
		let slug = ''
		if (attr) {
			slug = attr.value
		}
		return h(App, {
			props: {slug}
		})
	}
})
