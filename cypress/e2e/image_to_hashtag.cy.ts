// cypress/integration/homepage_spec.js
import 'cypress-file-upload'

describe('Hashtag to Image', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.login('google')
    cy.visit('/hashtag/image-to-hashtag')
  })

  it('contains the correct title', () => {
    cy.get('h1').contains('IMAGE TO HASHTAG')
    cy.get('h2').contains('Image Upload')
    cy.get('input[type="file"]').attachFile('test.png')
    cy.get('button').contains('Annotate').should('be.enabled')
    cy.get('button').contains('Annotate').click()
    cy.get('.react-loading-skeleton').should('exist')
    cy.get('.react-loading-skeleton', { timeout: 30000 }).should('not.exist')
    cy.get('h2').contains('Image label annotation')
    cy.get('button').contains('+ Get Hashtag').click()
    cy.get('span').contains('Get hashtag recommendation').should('be.visible')
    cy.get('div', { timeout: 30000 }).contains('Greater').should('be.visible')
    cy.get('div').contains('Greater').click() // wait for the dropdown to be visible

    cy.get('ul li input[type="checkbox"]').then(($checkboxes) => {
      const randomIndex = Math.floor(Math.random() * $checkboxes.length)
      cy.wrap($checkboxes[randomIndex]).click()
    })

    cy.get('button').contains('Select All').click()
    cy.get('button').contains('Copy Selected').click()
  })
})
