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
})
