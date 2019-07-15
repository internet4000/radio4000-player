import {mount} from '@vue/test-utils'
import Component from '../../src/ProviderPlayer.vue'

const testYouTubeUrl = 'https://www.youtube.com/watch?v=ihyQf8mww3o'
const testFileUrl =
	'https://upload.wikimedia.org/wikipedia/commons/5/53/Birds_Polyphonic.ogg'

describe('<ProviderPlayer> component', function() {
	let wrapper, vm

	beforeEach(() => {
		wrapper = mount(Component)
		vm = wrapper.vm
	})

	it('initil playing state corresponds to html element autoplay', function() {
		expect(vm.isPlaying).to.equal(vm.autoplay)
	})

	it('detects youtube provider from track.url', function() {
		expect(vm.track).to.equal(undefined)
		vm.track = {url: testYouTubeUrl}
		vm.$nextTick(() => {
			expect(vm.provider, 'youtube')
		})
	})

	it('detects file provider from track.url', function() {
		expect(vm.track).to.equal(undefined)
		expect(vm.provider, undefined)
		vm.track = {url: testFileUrl}
		vm.$nextTick(() => {
			expect(vm.provider, 'file')
		})
	})
})
