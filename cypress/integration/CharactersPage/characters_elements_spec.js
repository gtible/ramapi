describe('Characters Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080')
    })

    it('search is present', () => {
        cy.get('#search')
    })  

    it('search type is ok', () => {
      cy.get('#search')
      .type('rick').should('have.value', 'rick')
    })

    it('search sort by name', () => {
        cy.get('#search')
        .type('rick').should('have.value', 'rick')
    })

    it('checkox alive is present', () => {
        cy.get('#aliveCheckbox')
    }) 

    it('checkbox dead is present', () => {
        cy.get('#deadCheckbox')
    }) 

    it('checkbox unknown is present', () => {
        cy.get('#unknownCheckbox')
    })

    it('characters List is present', () => {
        cy.get('#unknownCheckbox')
    })

    it('pagination is present', () => {
        cy.get('#pagination')
    })

    it('there is 20 cards displayed', () => {
        cy.get('#search')
        .type('rick').should('have.value', 'rick')
    })

  })
  