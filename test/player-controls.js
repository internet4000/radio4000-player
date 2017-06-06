import test from 'ava'
import Vue from 'vue'
import Component from '../src/PlayerControls.vue'

test.cb('renders', t => {
	const vm = new Vue(Component).$mount()
	const tree = {$el: vm.$el.outerHTML}
	const $ = selector => vm.$el.querySelectorAll(selector)
	const playpauseBtn = $('.PlayerControl-group--large')[0].querySelector('button')

	t.snapshot(tree)

	t.is($('.Btn--mute').length, 1)
	t.is($('.Btn--shuffle').length, 1)

	t.is(playpauseBtn.textContent.trim(), 'Play')
	vm.$props.isPlaying = true
	vm.$nextTick(() => {
		t.is(playpauseBtn.textContent.trim(), 'Pause')
		t.end()
	})
})
