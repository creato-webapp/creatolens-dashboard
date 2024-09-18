describe('Create Instagram Page', () => {
  beforeEach(() => {
    cy.visit('/')
    // Log in as a user
    cy.login('google')
  })

  it(
    'should create a new Instagram account',
    {
      scrollBehavior: 'bottom',
    },
    () => {
      // Assert the accounts page is displayed
      cy.visit('/accounts')
      // cy.visit('/accounts')

      cy.get('h1').contains('ACCOUNTS').should('be.visible')
      // Assert and click the 'Create New Account' button
      cy.get('button').contains('Create New Account').should('be.visible')

      // cy.get('button#create-new-account-button').trigger('mouse')
      cy.get('button').contains('Create New Account').click()

      // Assert the URL has changed to the expected one
      cy.url().should('include', '/accounts/bot/new')

      // Assert the 'Instagram account' and 'Account password' fields are visible
      cy.get('h4').contains('Instagram account').should('be.visible')

      cy.get('h4').contains('Account password').should('be.visible')

      // Fill in the username field and assert the value
      const username = generateRandomUsername()
      cy.get('input#username').type(username)
      cy.get('input#username').should('have.value', username)

      // Fill in the password field and assert the value
      const password = 'oskdpfI@OJ#OJd'
      cy.get('input#pwd').type(password)
      cy.get('input#pwd').should('have.value', password)

      // Check the 'Acknowledge' checkbox and assert it is checked
      cy.get('input#acknowledge').check()
      cy.get('input#acknowledge').should('be.checked')
      // Assert the submit button is enabled and click it
      cy.get('button[type="submit"]').should('not.be.disabled')
      cy.get('button[type="submit"]').focus()
      cy.get('button[type="submit"]').click()

      cy.get('p', {
        timeout: 30000,
      })
        .contains('created successfully')
        .should('be.visible')

      cy.visit('/accounts')

      // Optionally, assert the URL has changed or some other success outcome
    }
  )
})

function generateRandomUsername(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let username = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    username += characters[randomIndex]
  }
  return username
}
