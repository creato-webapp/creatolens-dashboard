describe('Account List', () => {
  const mockNextAuthSession = (session) => {
    cy.intercept('GET', '/api/auth/session', {
      body: session,
    }).as('mockedAuthSession')
  }

  context('With Authenticated Session', () => {
    beforeEach(() => {
      // Mock an authenticated session
      mockNextAuthSession({
        expires: '2099-01-01T00:00:00.000Z', // Use a future date
        user: {
          email: 'test@example.com',
          name: 'Test User',
          image: 'https://example.com/test-user-image.png',
        },
      })
    })

    it('should display account list after login', () => {
      // Visit the account list page assuming the user is logged in

      // Verify that the user is on the account list page
      cy.visit('/accounts')
      // Verify that the account list is displayed
      cy.get('.account-list').should('be.visible')
    })
  })

  context('Without Authenticated Session', () => {
    beforeEach(() => {
      // Here, you explicitly ensure there's no authenticated session
      // by intercepting the auth session request and returning a 401 or similar strategy
      // Or simply don't mock the session as in this specific scenario

      // For example, to clear any session cookies that might have been set:
      cy.clearCookies()
    })

    it('redirect to login page if not logged in', () => {
      // Visit the account list page without logging in
      cy.visit('/accounts')

      // Verify redirection to the login page
      cy.url().should('include', '/login')
    })
  })
})
