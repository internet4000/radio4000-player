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
		expect(vm.$el.querySelector('#VimeoPlayerR4').id).to.equal('VimeoPlayerR4')
	})
})
