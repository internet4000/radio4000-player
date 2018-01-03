describe('shuffle', function() {
	before(() => {
		cy.visit('/')
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
