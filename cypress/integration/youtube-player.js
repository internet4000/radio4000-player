import { mount } from '@vue/test-utils'
import Component from '../../src/YoutubePlayer.vue'

describe('<YoutubePlayer> component', function() {
	let wrapper, vm

	beforeEach(() => {
		wrapper = mount(Component)
		vm = wrapper.vm
	})

	it('component is an empty element for the iframe', function() {
		expect(wrapper.element.classList.value).to.equal('ytplayer')
		expect(vm.$el.querySelector('#YoutubeIframeR4').id).to.equal('YoutubeIframeR4')
	})

	it('autoplay is not enabled', function() {
		expect(vm.autoplay).to.equal(false)
	})

	it('didPlay changes to true', function() {
		expect(vm.$data.didPlay).to.equal(false)
		vm.$props.videoId = '-Op4D4bkK6Y'
		// Wrapping in nextTick is some times required.
		vm.$nextTick(() => {
			// Three ways of achieving the same.
			expect(vm.$data.didPlay).to.eq(true)
			expect(vm.$data.didPlay).to.equal(true)
			assert.equal(vm.$data.didPlay, true, 'did play changed to true')
		})
	})
})
