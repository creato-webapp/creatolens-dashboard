describe('Social Logins Demo', () => {
  beforeEach(() => {
    // can provide Facebook, Google, or Microsoft here
    cy.loginToAuth0ViaSocial('google')
  })
})
