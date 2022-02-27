import { mount } from '@vue/test-utils'
import Tracklist from '../../src/Tracklist.vue'

describe('<Tracklist> component', function() {
	let wrapper = mount(Tracklist, {
		attachToDocument: true
	})

	it('shows a loader without tracks', function() {
		// Weird way to check if an element exists.
		assert.isOk(wrapper.find('.Loading').element)
		// cy.get('.Tracklist').should('exist')
	})

	it('renders an array in the order it receives', function() {
		let tracks = [...'abc'].map(title => ({ title }))

		assert.equal(wrapper.findAll('.Tracklist-item').length, 0)
		wrapper.vm.$props.tracks = tracks

		// nextTick doesn't in cypress (yet?)
		// return wrapper.vm.$nextTick(() => {
		return cy.wait(10).then(() => {
			assert.equal(wrapper.findAll('.Tracklist-item').length, 3)
			assert.equal(wrapper.findAll('.TrackItem-title').wrappers[0].element.textContent, 'a')
			assert.equal(wrapper.findAll('.TrackItem-title').wrappers[1].element.textContent, 'b')
			assert.equal(wrapper.findAll('.TrackItem-title').wrappers[2].element.textContent, 'c')
		})
	})

	it('shows query message if supplied', function() {
		assert.isNotOk(wrapper.find('.Tracklist-query').element)
		wrapper.vm.$props.query = '#jazz #funk'
		return cy.wait(10).then(() => {
			assert.isOk(wrapper.find('.Tracklist-query').element)
		})
	})
})
