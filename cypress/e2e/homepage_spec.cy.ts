describe('Homepage Test', () => {
  it('loads successfully and contains correct content', () => {
    cy.visit('/')
    cy.contains('Get Your Content Seen')
    cy.contains("Elevate your content's visibility with 100% personalised hashtag trend recommendations.")
    cy.get('button').contains('Free Trial').should('be.visible').click()
  })
})
