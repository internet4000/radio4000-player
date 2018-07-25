describe('<Radio4000> and data fetching', function() {
	beforeEach(function() {
		cy.visit('/test.html')
	})

	it('it can change radio', function() {
		cy.get('.Header-channel').should('not.contain', 'Radio Oskar')
		cy.get('radio4000-player').then($player => {
			$player.attr('channel-slug', 'oskar')
			cy.get('.Header-channel').should('contain', 'Radio Oskar')
		})
	})

	it('and it can change radio again via track id', function() {
		cy.get('.Header-channel').should('not.contain', 'Radio Maretto')
		cy.get('radio4000-player').then($player => {
			$player.attr('track-id', '-JYZuBhe3ep1KxlOO4j1')
			cy.get('.Header-channel').should('contain', 'Radio Maretto')
		})
	})
})

describe('<radio4000-player> web component', function() {
	before(() => {
		cy.visit('/test.html')
	})

	it('it renders', function() {
		cy.get('radio4000-player').as('player')
			.should('have.length', 1)
			// .should('have.attr', 'channel-slug', '200ok')
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

			// enable shuffle
			cy.get('.Btn--shuffle').click()
			var shuffleTitle = $el.text()
			cy.get('.TrackItem-title').eq(1).should('not.contain', title)

			// disable shuffle
			cy.get('.Btn--shuffle').click()
			cy.get('.TrackItem-title').eq(1).should('contain', title)

			// enabling shuffle again doesn't reuse previous shuffled list
			cy.get('.Btn--shuffle').click()
			cy.get('.TrackItem-title').eq(1).should('not.contain', shuffleTitle)
		})
	})
})
