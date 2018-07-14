describe('<PlayerData> component', function() {
	beforeEach(function() {
		cy.visit('/')
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
