// /// <reference types="cypress" />
// // ***********************************************
// // This example commands.ts shows you how to
// // create various custom commands and overwrite
// // existing commands.
// //
// // For more comprehensive examples of custom
// // commands please read more here:
// // https://on.cypress.io/custom-commands
// // ***********************************************
// //
// //
// // -- This is a parent command --
// // Cypress.Commands.add('login', (email, password) => { ... })
// //
// //
// // -- This is a child command --
// // Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
// //
// //
// // -- This is a dual command --
// // Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
// //
// //
// // -- This will overwrite an existing command --
// // Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// //
// // declare global {
// //   namespace Cypress {
// //     interface Chainable {
// //       login(email: string, password: string): Chainable<void>
// //       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
// //       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
// //       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
// //     }
// //   }
// // }

Cypress.Commands.add('logout', () => {
  cy.clearCookie('next-auth.session-token')
})

Cypress.Commands.add('loginToAuth0ViaSocial', (SOCIAL_PROVIDER: 'google') => {
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
  // clear cookies

  cy.origin(
    'https://accounts.google.com',
    {
      args: {
        username,
        password,
      },
    },
    ({ username, password }) => {
      Cypress.on('uncaught:exception', (err) => !err.message.includes('ResizeObserver loop') && !err.message.includes('Error in protected function'))

      cy.get('input[type="email"]').type(username, {
        log: false,
      })
      // NOTE: The element exists on the original form but is hidden and gets rerendered, which leads to intermittent detached DOM issues
      cy.contains('Next').click()

      cy.get('input[type="password"]').type(password, {
        log: false,
      })

      cy.contains('Next').click()

      cy.contains('Continue').click()
    }
  )

  cy.visit(Cypress.env('SITE_NAME') + '/dashboard')

  cy.get('button[id="login"]').click()
}
