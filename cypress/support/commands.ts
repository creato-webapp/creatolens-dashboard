Cypress.Commands.add('logout', () => {
  cy.clearCookie('next-auth.session-token')
})

Cypress.Commands.add('login', (SOCIAL_PROVIDER: 'google') => {
  const log = Cypress.log({
    displayName: 'Social LOGIN',
    message: [`🔐 Authenticating | ${SOCIAL_PROVIDER}`],
    autoEnd: false,
  })
  log.snapshot('before')

  switch (SOCIAL_PROVIDER) {
    case 'google':
      logIntoGoogle(Cypress.env('GOOGLE_USERNAME'), Cypress.env('GOOGLE_PASSWORD'))
      break

    default:
      throw new Error('no social provider configured!')
  }

  log.snapshot('after')
  log.end()
})

function logIntoGoogle(username: string, password: string) {
  Cypress.on('uncaught:exception', (err) => !err.message.includes('ResizeObserver loop') && !err.message.includes('Error in protected function'))
  cy.visit(Cypress.env('SITE_NAME') + '/auth/login')
  cy.get('button[id="login"]').click()
  cy.origin('https://accounts.google.com', { args: { username, password } }, ({ username, password }) => {
    Cypress.on('uncaught:exception', (err) => !err.message.includes('ResizeObserver loop') && !err.message.includes('Error in protected function'))

    // Perform login on Google page
    cy.get('input[type="email"]').type(username, { log: false })
    cy.contains('Next').click()
    cy.get('input[type="password"]').type(password, { log: false })
    cy.contains('Next').click()
    cy.contains('Continue', { timeout: 50000 }).click()
  })
  // Return to the original site and verify login success
  cy.get('button[id="login"]').click()
  cy.contains('Logout').should('be.visible')
}

function logIntoGoogleSecondTime() {
  Cypress.on('uncaught:exception', (err) => !err.message.includes('ResizeObserver loop') && !err.message.includes('Error in protected function'))
  cy.visit(Cypress.env('SITE_NAME') + '/auth/login')
  cy.get('button[id="login"]').click()
  cy.contains('Logout').should('be.visible')
}

Cypress.Commands.add('login_google_second_time', () => {
  logIntoGoogleSecondTime()
})
