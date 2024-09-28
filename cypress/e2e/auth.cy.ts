describe('Auth', function () {
  it('login and logout successfully then login again', function () {
    cy.login('google')
    cy.logout()
    cy.visit('/')
    cy.login_google_second_time()
  })
})
