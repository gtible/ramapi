describe('Characters Page error', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080')
      })

      it('search error displayed and contains search info', () => {
        cy.get('#search')
        .type('lll ').should('have.value', 'lll ')

        cy.get('#searchError').contains('lll ')
      })
    
})