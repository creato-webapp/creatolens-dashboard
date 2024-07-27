describe('Create Instagram Page', () => {
  beforeEach(() => {
    cy.visit('/')
    // Log in as a user
    cy.login()

    cy.intercept('*', (req) => {
      req.headers['X-Test-Auth-Token'] = Cypress.env('X-Test-Auth-Token')

      // Log the request to the console
      console.log('Request intercepted:', req)

      req.continue((res) => {
        // Log the response to the console
        console.log('Response received:', res)
      })
    }).as('allRequests')
    cy.visit('/accounts')
  })

  it('should create a new Instagram account', () => {
    // Assert the accounts page is displayed
    cy.get('h1').contains('ACCOUNTS').should('be.visible')
    cy.wait(2000) // Custom wait

    // Assert and click the 'Create New Account' button
    cy.get('button').contains('Create New Account').should('be.visible').click()

    // Assert the URL has changed to the expected one
    cy.url().should('include', '/accounts/bot/new')
    cy.wait(2000) // Custom wait

    // Assert the 'Instagram account' and 'Account password' fields are visible
    cy.get('h4').contains('Instagram account').should('be.visible')
    cy.get('h4').contains('Account password').should('be.visible')

    // Fill in the username field and assert the value
    const username = 'your_username'
    cy.get('input#username').type(username).should('have.value', username)
    cy.wait(2000) // Custom wait

    // Fill in the password field and assert the value
    const password = 'your_password'
    cy.get('input#pwd').type(password).should('have.value', password)
    cy.wait(2000) // Custom wait

    // Check the 'Acknowledge' checkbox and assert it is checked
    cy.get('input#acknowledge').check().should('be.checked')
    cy.wait(2000) // Custom wait

    // Assert the submit button is enabled and click it
    cy.get('button[type="submit"]').should('not.be.disabled').click()
    cy.wait(2000) // Custom wait

    // Optionally, assert the URL has changed or some other success outcome
    cy.url().should('include', '/accounts/success') // Replace with the expected URL or outcome
  })
})
