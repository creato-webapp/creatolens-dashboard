describe('Login page', () => {
  it('Login with Google', () => {
    cy.visit('/')
    // cy.login({ fixture: 'session.json' })
    cy.google_login()
    cy.visit('/accounts')
    // cy.get('button').contains('Create New Account').should('be.visible')
    cy.get('button').contains('Create New Account').should('be.visible').click()
    // url should include /accounts/create-account
    cy.url().should('include', '/accounts/create-account')
  })
})
