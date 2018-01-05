describe('<PlayerData> component', function() {
	beforeEach(function() {
		cy.visit('/')
	})

	it('it can change radio', function() {
		cy.get('radio4000-player').should('have.attr', 'channel-slug', '200ok')
		cy.get('radio4000-player').then($player => {
			$player.attr('channel-slug', 'oskar')
			cy.get('.Header-channel').should('contain', 'Radio Oskar')
		})
	})
})
