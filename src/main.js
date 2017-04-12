import Vue from 'vue'
import App from './App.vue'

// Pass attributes from the HTML element to the root Vue instance.
function getAttr(attrs, key) {
	return attrs[key] ? attrs[key].value : ''
}

function createPlayer(el) {
	const attrs = el.attributes
	return new Vue({
		el, 
		render(h) {
			return h(App, {
				props: {
					slug: getAttr(attrs, 'slug'),
					volume: Number(getAttr(attrs, 'volume'))
				}
			})
		}
	})
}

// Support multiple components on the same page.
let players = document.querySelectorAll('radio4000-player')
players.forEach(el => createPlayer(el))
