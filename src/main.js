import Vue from 'vue'
import App from './App.vue'

// Avoids errors when vue livereloads and the attrs are missing.
function getAttr(context, key) {
	return context.slug ? context[key].value : null
}

new Vue({
	el: 'radio4000-player',
	render(h) {
		const attrs = this.$el.attributes
		const slug = getAttr(attrs, 'slug')
		return h(App, {
			props: {
				slug
			}
		})
	}
})
