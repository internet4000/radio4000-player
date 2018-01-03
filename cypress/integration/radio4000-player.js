describe('My First Test', function() {
	it('Does not do much!', function() {
		expect(true).to.equal(true)
	})
})

describe('<radio4000-player> tests', function() {
	before(() => {
		// You will need to run `yarn start` yourself.

		// Visiting our app before each test removes any state build up from
		// previous tests. Visiting acts as if we closed a tab and opened a fresh one
		// https://on.cypress.io/visit
		cy.visit('http://localhost:4002')
	})

	beforeEach(function() {
	})

	it('it renders', function() {
		cy.get('radio4000-player').as('player')
			.should('have.length', 1)
			.should('have.attr', 'channel-slug', '200ok')
	})

	it('marquee shows track title', function() {
		cy.get('radio4000-player').then($player => {
			var $track = $player.find('.TrackItem').first().find('.TrackItem-title')
			cy.get('marquee').should('contain', $track.text())
		})
	})

	it('it can change radio', function() {
		cy.get('radio4000-player').then($player => {
			$player.attr('channel-slug', 'oskar')
			cy.get('.Header-channel').should('contain', 'Radio Oskar')
		})
	})
})
