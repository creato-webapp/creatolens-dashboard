describe('Pair Account With Instabot', () => {
  it('Visit Accounts Page', () => {
    cy.visit(`${Cypress.env('SITE_NAME')}/accounts`)
  })
})
