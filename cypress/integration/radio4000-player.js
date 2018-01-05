describe('<radio4000-player> web component', function() {
	before(() => {
		// You will need to run `yarn start` yourself.

		// Visiting our app before each test removes any state build up from
		// previous tests. Visiting acts as if we closed a tab and opened a fresh one
		// https://on.cypress.io/visit
		cy.visit('/')
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

	it('pressing "shuffle" shuffles the track list', function() {
		cy.get('.TrackItem-title').eq(1).then($el => {
			var title = $el.text()
			cy.get('.Btn--shuffle').click()
			cy.get('.TrackItem-title').eq(1).should('not.contain', title)
			cy.get('.Btn--shuffle').click()
			cy.get('.TrackItem-title').eq(1).should('contain', title)
		})
	})
})
