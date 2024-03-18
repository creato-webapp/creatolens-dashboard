describe('Cypress login', () => {
  it('should provide a valid session', () => {
    cy.logout()
    cy.login({ fixture: 'session.json' })
    // cy.wait('@session')
    cy.visit('/accounts')
    cy.log('Cypress login successful')
    cy.wait(1000)

    // Check if the page contains the expected text
    cy.contains('Accounts')

    // page contains the table
    cy.get('table').should('exist')
  })
})
