describe('Characters Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/characters/1')
    })

    it('name is present with good info', () => {
        cy.wait(500)
        cy.get('.card-title').contains('Rick Sanchez')
    }) 
    
    it('image is present', () => {
        cy.wait(500)
        cy.get('.card-img-top')
    }) 

    it('status is present with good info', () => {
        cy.wait(500)
        cy.get('#statusInfoLabel').contains("status :")
        cy.wait(500)
        cy.get('#statusInfo').contains("Alive")
    })  

    it('species is present with good info', () => {
        cy.wait(500)
        cy.get('#speciesInfoLabel').contains("species :")
        cy.wait(500)
        cy.get('#speciesInfo').contains("Human")
    })  

    it('type is present with good info', () => {
        cy.wait(500)
        cy.get('#typeInfoLabel').contains("type :")
        cy.wait(500)
        cy.get('#typeInfo').contains("not specified")
    })  

    it('gender is present with good info', () => {
        cy.wait(500)
        cy.get('#genderInfoLabel').contains("gender :")
        cy.wait(500)
        cy.get('#genderInfo').contains("Male")
    })  

    it('location is present with good info', () => {
        cy.wait(500)
        cy.get('#locationInfoLabel').contains("location :")
        cy.wait(500)
        cy.get('#locationInfo').contains("Citadel of Ricks")
    })

    it('origin is present with good info', () => {
        cy.wait(500)
        cy.get('#originInfoLabel').contains("origin :")
        cy.wait(500)
        cy.get('#originInfo').contains("Earth (C-137)")
    }) 
    
    it('number of episodes is present with good info', () => {
        cy.wait(1000)
        cy.get('#episodesInfoLabel').contains("episodes :")
        cy.wait(1000)
        cy.get('#episodesInfo').contains("51")
    })
    
    it('created date is present with good info', () => {
        cy.wait(500)
        cy.get('#createdInfoLabel').contains("created :")
        cy.wait(500)
        cy.get('#createdInfo').contains("2017/11/4")
    }) 

})