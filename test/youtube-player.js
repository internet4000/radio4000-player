import test from 'ava'
import Vue from 'vue'
import Component from '../src/YoutubePlayer.vue'

test('renders', t => {
	const vm = new Vue(Component).$mount()
	const tree = {
		$el: vm.$el.outerHTML
	}
	t.snapshot(tree)
	const $ = selector => vm.$el.querySelectorAll(selector)
	t.is($('.ytplayer').length, 1, 'it has an empty element for the yt player to replace')
})
