describe('Login page', () => {
  it('Login with Google', () => {
    cy.visit('/')

    cy.login()

    cy.visit('/accounts')
  })
})
