import test from 'ava'
import Vue from 'vue'
import Component from '../src/TrackList.vue'

test.cb('renders', t => {
	const vm = new Vue(Component).$mount()
	const tree = {
		$el: vm.$el.outerHTML
	}
	const $ = selector => vm.$el.querySelectorAll(selector)

	// console.log(vm.$el.outerHTML)
	t.is($('.Loading').length, 1, 'it shows the loader without tracks')
	vm.$props.tracks = [...'abc'].map(title => {
		return {title}
	})
	vm.$nextTick(() => {
		// console.log(vm.$el.outerHTML)
		t.is($('.TrackItem')[0].textContent.trim(), 'a', 'it renders the list in the order it receives')
		t.is($('.TrackItem').length, 3, 'it renders the right amount tracks')
		t.snapshot(tree)
		t.end()
	})
})
