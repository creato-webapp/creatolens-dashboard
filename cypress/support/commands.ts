/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

interface ICookie {
  name: string
  value: string
  domain?: string
  path?: string
  secure?: boolean
  httpOnly?: boolean
  expiry?: number // Use 'expiry' to match Cypress's setCookie command
}
Cypress.Commands.add('google_login', (username = Cypress.env('GOOGLE_USER'), password = Cypress.env('GOOGLE_PW')) => {
  // Generate and set a valid cookie from the fixture that next-auth can decrypt

  cy.visit(Cypress.env('SITE_NAME'))
  const loginUrl = Cypress.env('SITE_NAME')

  const socialLoginOptions = {
    username,
    password,
    loginUrl,
    headless: true,
    logs: true,
    isPopup: false,
    loginSelector: `button[id="login"]`,
    postLoginSelector: 'button[id="logout-button"]',
  }

  // cy looks for button with id="login" is visible
  cy.clearCookies()

  return cy.task<{ cookies: ICookie[] }>('GoogleSocialLogin', socialLoginOptions).then((result) => {
    const { cookies } = result // Now 'cookies' is explicitly typed as 'ICookie[]'
    cy.clearCookies()
    cookies.forEach((cookie: ICookie) => {
      if (cookie) {
        cy.setCookie(cookie.name, cookie.value, {
          domain: cookie.domain,
          expiry: new Date('2012-02-26').getTime(),
          httpOnly: cookie.httpOnly,
          path: cookie.path,
          secure: cookie.secure,
        })
      } else {
        cy.log('no cookie')
      }
    })
    cy.visit('/')
  })
})

Cypress.Commands.add('logout', () => {
  cy.clearCookie('next-auth.session-token')
})
