describe('player controls', function() {
	before(() => {
		cy.visit('/test.html')
	})

	it('it is not playing', function() {
		cy.get('.PlayPause-state').should('not.be.checked')
	})

	it('has all the buttons', () => {
		cy.get('.Btn--mute').should('have.length', 1)
		cy.get('.Btn--shuffle').should('have.length', 1)
		cy.get('.Btn--next').should('have.length', 1)
		cy.get('.PlayPause').should('have.length', 1)
	})

	it('first track is selected', function() {
		cy.get('radio4000-player').find('.TrackItem').first().should('have.class', 'active')
	})

	it('tapping "next" does not play next track', function() {
		cy.get('.Btn--next').click()
		cy.get('.TrackItem').eq(0).should('not.have.class', 'active')
		cy.get('.TrackItem').eq(1).should('have.class', 'active')
		cy.get('.PlayPause-state', {timeout: 20000}).should('not.be.checked')
	})

	it('tapping "next" plays next track when isPlaying', function() {
		cy.get('.PlayPause-state').click()
		cy.get('.Btn--next').click()
		cy.get('.TrackItem').eq(0).should('not.have.class', 'active')
		cy.get('.TrackItem').eq(1).should('have.class', 'active')
		cy.get('.PlayPause-state', {timeout: 20000}).should('be.checked')
	})

	it('tapping "pause" pauses', function() {
		cy.get('.PlayPause-state').should('be.checked')
		cy.get('.PlayPause-label').click()
		cy.get('.PlayPause-state').should('not.be.checked')
	})
})
