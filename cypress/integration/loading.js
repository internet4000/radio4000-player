import { mount } from '@vue/test-utils'
import Loading from '../../src/Loading.vue'

describe('<Loading> component', function() {
	it('it shows the loading message', function() {
		let wrapper = mount(Loading)
		let vm = wrapper.vm
		vm.$props.message = 'hello this is dog'
		// vm.$nextTick(() => {
		return cy.wait(10).then(() => {
			assert.equal(wrapper.element.innerText, 'hello this is dog')
		})
	})
})
