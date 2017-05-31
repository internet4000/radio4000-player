import test from 'ava'
import Vue from 'vue'
import Component from '../src/Loading.vue'

test('renders', t => {
	const vm = new Vue(Component).$mount()
	const $ = selector => vm.$el.querySelectorAll(selector)
	const tree = {
		$el: vm.$el.outerHTML
	}
	t.snapshot(tree)

	vm.$props.message = 'hello this is dog'
	vm.$nextTick(() => {
		let messageInTheDom = $('span')[0].textContent
		t.is(messageInTheDom, 'hello this is dog', 'it shows the loading message')
	})
})
