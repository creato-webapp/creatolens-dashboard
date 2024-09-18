// cypress/integration/homepage_spec.js

describe('Hashtag to Image', () => {
  beforeEach(() => {
    cy.visit('/')
    // cy.login('google')
  })

  it(
    'contains the correct title',
    {
      scrollBehavior: 'bottom',
      slowTestThreshold: 50000,
    },
    () => {
      cy.visit('/hashtag/hashtag-to-image')

      cy.get('h1').contains('HASHTAG TO IMAGE')
      cy.get('h2').contains('Keywords input')

      cy.get('textarea').should('be.visible')
      // input text in textarea
      cy.get('textarea').type('Happy Sun')

      cy.get('button').contains('Next').click()

      cy.get('h2').contains('Format')
      cy.get('h2').contains('Aspect ratio')

      cy.get('div[class*="16:9"]').click()

      cy.get('h2').contains('General')
      cy.get('div[class*="16:9"]').click()

      cy.get('div').contains('Environment').click()
      cy.get('li').contains('Outdoor').click()

      cy.get('div').contains('Point of View').click()
      cy.get('li').contains('Overhead').click()

      cy.get('div').contains('Mood').click()
      cy.get('li').contains('Energetic').click()

      cy.get('div').contains('Theme').click()

      cy.get('button').contains('Generate Image').click()

      cy.get('.react-loading-skeleton').should('exist')
      cy.get('h4').contains('Here is the image based on your description. Re-organize input below to get new images.')

      cy.get('button').contains('Re-Generate').should('not.be.disabled')
    }
  )
})
