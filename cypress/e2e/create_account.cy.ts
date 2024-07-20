describe('Create Account', () => {
  it('should display create instagram page', () => {
    cy.visit('/accounts/create-account')

    cy.get('h1').contains('CREATE NEW ACCOUNT')
    cy.get('p').contains('Connect your Instagram account')

    // check if the form is present
    cy.get('form').should('be.visible')

    // check if the form fields are present
    cy.get('input[name="username"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
    cy.get('input[name="acknowledge"]').should('be.visible')
    cy.get('button').contains('Create').should('be.visible')

    // check if the form fields are empty
    cy.get('input[name="username"]').should('have.value', '')
    cy.get('input[type="password"]').should('have.value', '')
    cy.get('input[name="acknowledge"]').should('not.be.checked')

    const uuid = () => Cypress._.random(0, 1e6)
    const id = uuid()
    const username = `testname${id}`
    const password = 'test_password'
    cy.get('input[name="username"]').type(username).should('have.value', username)
    cy.get('input[type="password"]').type(password).should('have.value', password)
    cy.get('input[name="acknowledge"]').check().should('be.checked')
    // check the submit button is clickable
    // find button with type submit and check if it is enabled
    cy.get('button[type="submit"]').should('be.enabled')
    cy.get('button[type="submit"]').click()

    cy.wait(5000)
    cy.visit('/accounts')
    cy.get('table').contains('td', username).should('be.visible')
  })
})
