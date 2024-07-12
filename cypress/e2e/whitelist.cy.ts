describe('Whitelist', () => {
  it('should display signined', () => {
    cy.google_login()
  })
  //   it('should display you are not in whitelist', () => {
  //     const username = Cypress.env('GOOGLE_USER_NOT_IN_WHITELIST')
  //     const password = Cypress.env('GOOGLE_PW_NOT_IN_WHITELIST')
  //     cy.google_login(username, password)
  //   })
})
