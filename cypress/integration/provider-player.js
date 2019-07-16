import {mount} from '@vue/test-utils'
import ProviderPlayer from '../../src/ProviderPlayer.vue'

const testYouTubeUrl = 'https://www.youtube.com/watch?v=ihyQf8mww3o'
const testFileUrl =
	'https://upload.wikimedia.org/wikipedia/commons/5/53/Birds_Polyphonic.ogg'

describe('<ProviderPlayer> component', function() {
	let wrapper, vm

	beforeEach(function() {
		wrapper = mount(ProviderPlayer)
		vm = wrapper.vm
	})

	it('shows loading', function() {
		vm.track = {
			url: testYouTubeUrl
		}

		expect(vm.showLoader).to.equal(true)
		expect(vm.provider).to.equal(undefined)
	})

	it('shows loading for specified provider', function() {
		vm.track = {
			url: testYouTubeUrl,
			provider: 'youtube'
		}

		expect(vm.showLoader).to.equal(true)
		expect(vm.provider).to.equal('youtube')
	})
})
