// cypress/integration/homepage_spec.js

describe('Homepage Test', () => {
  it('successfully loads', () => {
    cy.visit('/') // Change '/' to your Next.js local dev URL, e.g., 'http://localhost:3000'
  })

  it('contains the correct title', () => {
    cy.visit('/')
    cy.contains('Get Your Content Seen') // Replace 'Your Page Title Here' with a title or text present on your homepage
    cy.contains("Elevate your content's visibility with 100% personalised hashtag trend recommendations.") // Replace 'Your Page Title Here' with a title or text present on your homepage

    // Check button is present and clickable
    cy.get('button').contains('Free Trial').click()
  })
})
