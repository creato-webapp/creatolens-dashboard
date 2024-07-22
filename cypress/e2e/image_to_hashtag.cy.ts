describe('Create Instagram Page', () => {
  beforeEach(() => {
    cy.visit('/')
    // Log in as a user
    // cy.fixture('users').then((users) => {
    //   cy.login(users)
    // })

    cy.visit('/hashtag/image-to-hashtag')
  })

  it('should goto image upload page', () => {
    // Assert the accounts page is displayed
    cy.get('h1').contains('IMAGE TO HASHTAG').should('be.visible')
    cy.wait(1000) // Custom wait

    // Assert and click the 'Create New Account' button
    cy.get('h4').contains('Drag and drop or browse your files').should('be.visible')
    cy.wait(1000) // Custom wait

    cy.get('[role="presentation"]').attachFile('temp.png', { subjectType: 'drag-n-drop' })
    cy.wait(1000) // Custom wait

    cy.get('img[alt="Uploaded"]').should('be.visible').and('have.attr', 'src')
    cy.wait(1000) // Custom wait
    cy.get('button').contains('Annotate').should('be.visible').click()
    cy.wait(1000) // Custom wait

    cy.get('h1').contains('IMAGE TO HASHTAG').should('be.visible')
    cy.wait(1000) // Custom wait
    cy.get('h2').contains('Image label annotation').should('be.visible')
    cy.wait(1000) // Custom wait
    // cy.get('h2').contains('labels discovered').should('be.visible')

    cy.get('button').contains('Select All').should('be.visible')
    cy.get('button').contains('Re-annotate').should('be.visible')
    cy.get('button').contains('Get Hashtag').should('be.visible')
    cy.get('h3', { timeout: 30000 }).contains('labels discovered', { timeout: 30000 }).should('be.visible')

    cy.get('button').contains('Get Hashtag').click()
  })
})
