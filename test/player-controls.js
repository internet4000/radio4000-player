import test from 'ava'
import Vue from 'vue'
import Component from '../src/PlayerControls.vue'

test.cb('renders', t => {
	const vm = new Vue(Component).$mount()
	const tree = {$el: vm.$el.outerHTML}
	const $ = selector => vm.$el.querySelectorAll(selector)
	const playPauseInput= $('.PlayPause input')[0]

	/* t.snapshot(tree)*/

	t.is($('.Btn--mute').length, 1)
	t.is($('.Btn--shuffle').length, 1)

	t.is(playPauseInput.checked, false)
	vm.$props.isPlaying = true
	vm.$nextTick(() => {
		t.is(playPauseInput.checked, true)
		t.end()
	})
})
