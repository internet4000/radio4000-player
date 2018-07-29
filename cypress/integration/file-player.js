import {mount} from '@vue/test-utils'
import Component from '../../src/FilePlayer.vue'

const testUrl =
	'https://upload.wikimedia.org/wikipedia/commons/5/53/Birds_Polyphonic.ogg'

describe('<FilePlayer> component', function() {
	let wrapper, vm

	beforeEach(() => {
		wrapper = mount(Component)
		vm = wrapper.vm
	})

	it('top level element is <audio>', function() {
		expect(wrapper.element.tagName).to.equal('AUDIO')
	})

	it('autoplay is not enabled', function() {
		expect(vm.autoplay).to.equal(false)
	})

	it('not initially marked as playing', function() {
		expect(vm.isPlaying).to.equal(false)
	})

	it('accepts an URL property and uses it as src', function() {
		expect(vm.url).to.equal(undefined)
		vm.url = testUrl
		vm.$nextTick(() => {
			expect(wrapper.element.getAttribute('src')).to.equal(testUrl)
		})
	})
})
