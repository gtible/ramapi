describe('Characters Page Checkbox', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080')
      })

    it('checkox alive is present', () => {
        cy.get('#aliveCheckbox')
    })

    it('check alive checkbox checked', () => {
        cy.get('#aliveCheckbox').click()
        cy.get('#aliveCheckbox').should('be.checked')
    })

    it('check alive checkbox and check that all cards displayed have alive status label', () => {
        cy.get('#aliveCheckbox').click()
        cy.get('#aliveCheckbox').should('be.checked')
        cy.get('.statusLabel').contains('Alive')
    })

})