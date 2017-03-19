import Vue from 'vue'
import App from './App.vue'

new Vue({
	el: '#radio4000-player',
	render(h) {
		// Accept the `slug` from the <div> as a prop
		let slug = ''
		let attr = this.$el.attributes.slug
		if (attr) {
			slug = attr.value
		}
		return h(App, {
			props: {slug}
		})
	}
})
