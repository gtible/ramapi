describe('Characters Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080')
      })

    it('there is 20 element at first loading', () => {
        cy.get('.card')
            .should('have.length', 20)
    })

    it('each card contains img, status and button element', () => {
        cy.get('.card')
            .should('have.length', 20)

        cy.get('.card-img-top')
            .should('have.length', 20)

        cy.get('.card-title')
            .should('have.length', 20)

        cy.get('.linkToCharacterDetails')
            .should('have.length', 20)   
           
    })

    it('there is 18 elements for Beth searching', () => {
        cy.get('#search')
        .type('beth ').should('have.value', 'beth ')

        cy.get('.card')
            .should('have.length', 18)
            .then(el => {
                expect(el).to.have.length(18)
            })
    })

    it('click on card button go to character details page', () => {
        cy.get('.linkToCharacterDetails').first().click()
        cy.get('.card-title').contains("Rick")   
    })
})