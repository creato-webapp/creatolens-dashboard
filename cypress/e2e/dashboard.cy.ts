// cypress/integration/homepage_spec.js

describe('Dashboard Page', () => {
  beforeEach(() => {
    cy.login('google')
    cy.visit(Cypress.env('SITE_NAME') + '/dashboard')
  })

  it('contains the correct title', () => {
    cy.contains('TREND ANALYSIS')
  })
})
