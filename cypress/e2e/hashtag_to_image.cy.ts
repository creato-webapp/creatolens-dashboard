// cypress/integration/homepage_spec.js
import 'cypress-file-upload'

describe('Hashtag to Image', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.login('google')
    cy.visit('/hashtag/hashtag-to-image')
  })

  it('contains the correct title', () => {
    cy.get('h1').contains('HASHTAG TO IMAGE')
    cy.get('h2').contains('Keywords input')
    cy.get('textarea').should('be.visible')
    // input text in textarea
    cy.get('textarea').type('Happy Cat playing with a Dog')
    cy.get('button').contains('Next').click()
    cy.get('h2').contains('Format')
    cy.get('h2').contains('Aspect ratio')
    cy.get('h2').contains('General')

    cy.get('button').contains('Generate Image').click()

    cy.get('.react-loading-skeleton').should('exist')
    cy.get('h4').contains('Here is the image based on your description. Re-organize input below to get new images.')
  })
})
