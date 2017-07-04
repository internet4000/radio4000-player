import test from 'ava'
import Vue from 'vue'
import Component from '../src/YoutubePlayer.vue'

test.cb('renders', t => {
	const vm = new Vue(Component).$mount()
	const tree = {
		$el: vm.$el.outerHTML
	}
	const $ = selector => vm.$el.querySelectorAll(selector)

	t.snapshot(tree)

	t.is(vm.$el.className, 'ytplayer', 'has an element for the youtube iframe')
	t.is(vm.$props.autoplay, undefined, 'autoplay is not enabled')

	t.is(vm.$data.didPlay, false)
	vm.$props.videoId = '-Op4D4bkK6Y'
	vm.$nextTick(() => {
		t.is(vm.$data.didPlay, true, 'after playing, didPlay changes to true')
		t.end()
	})
})
