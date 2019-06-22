import { mount } from '@vue/test-utils'
import Component from '../../src/VimeoPlayer.vue'

describe('<VimeoPlayer> component', function() {
	let wrapper, vm

	beforeEach(() => {
		wrapper = mount(Component)
		vm = wrapper.vm
	})

	it('component is an empty element for the iframe', function() {
		expect(wrapper.element.classList.value).to.equal('VimeoPlayer')
		expect(vm.$el.innerHTML).to.equal('')
	})

	it('autoplay is not enabled', function() {
		expect(vm.autoplay).to.equal(false)
	})

	it('didPlay changes to true', function() {
		expect(vm.$data.didPlay).to.equal(false)
		vm.$props.videoId = '36579366'
		// Wrapping in nextTick is some times required.
		vm.$nextTick(() => {
			// Three ways of achieving the same.
			expect(vm.$data.didPlay).to.eq(true)
			expect(vm.$data.didPlay).to.equal(true)
			assert.equal(vm.$data.didPlay, true, 'did play changed to true')
		})
	})
})
