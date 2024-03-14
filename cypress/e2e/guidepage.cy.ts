// cypress/integration/homepage_spec.js

describe('GuidePage Test', () => {
  it('successfully loads', () => {
    cy.visit('/guide') // Change '/' to your Next.js local dev URL, e.g., 'http://localhost:3000'
  })

  it('contains the correct title', () => {
    cy.visit('/guide')
    //   cy.contains('USER GUIDE') // Replace 'Your Page Title Here' with a title or text present on your homepage
    cy.contains('Connect an empty IG account to LENS') // Replace 'Your Page Title Here' with a title or text present on your homepage
  })
})
