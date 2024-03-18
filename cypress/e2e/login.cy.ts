describe('Login page', () => {
  it('Login with Google', () => {
    cy.visit('/')
    cy.login({ fixture: 'session.json' })
    cy.google_login()
  })
})
