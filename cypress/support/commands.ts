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

// interface ICookie {
//   name: string
//   value: string
//   domain?: string
//   path?: string
//   secure?: boolean
//   httpOnly?: boolean
//   expiry?: number // Use 'expiry' to match Cypress's setCookie command
// }
// Cypress.Commands.add(
//   'google_login',
//   (username = Cypress.env('GOOGLE_USER_NOT_IN_WHITELIST'), password = Cypress.env('GOOGLE_PW_NOT_IN_WHITELIST')) => {
//     // Generate and set a valid cookie from the fixture that next-auth can decrypt

//     // cy.visit(Cypress.env('SITE_NAME'))
//     // const loginUrl = Cypress.env('SITE_NAME') + '/auth/login'

//     // const socialLoginOptions = {
//     //   username,
//     //   password,
//     //   loginUrl,
//     //   headless: false,
//     //   logs: true,
//     //   isPopup: true,
//     //   loginSelector: `button[id="login"]`,
//     //   postLoginSelector: 'button[id="logout-button"]',
//     // }

//     // // cy looks for button with id="login" is visible
//     // cy.clearCookies()

//     // return cy.task<{ cookies: ICookie[] }>('GoogleSocialLogin', socialLoginOptions).then((result) => {
//     //   const { cookies } = result // Now 'cookies' is explicitly typed as 'ICookie[]'
//     //   // cy.clearCookies()
//     //   cookies.forEach((cookie: ICookie) => {
//     //     if (cookie) {
//     //       cy.setCookie(cookie.name, cookie.value, {
//     //         domain: cookie.domain,
//     //         expiry: new Date('2012-02-26').getTime(),
//     //         httpOnly: cookie.httpOnly,
//     //         path: cookie.path,
//     //         secure: cookie.secure,
//     //       })
//     //     } else {
//     //       cy.log('no cookie')
//     //     }
//     //   })
//     //   cy.visit('/')
//     // })
//     cy.intercept('/api/auth/session', { fixture: 'session.json' }).as('session')

//     // Set the cookie for cypress.
//     // It has to be a valid cookie so next-auth can decrypt it and confirm its validity.
//     // This step can probably/hopefully be improved.
//     // We are currently unsure about this part.
//     // We need to refresh this cookie once in a while.
//     // We are unsure if this is true and if true, when it needs to be refreshed.
//     cy.setCookie('next-auth.session-token', 'a valid cookie from your browser session')
//   }
// )

// Cypress.Commands.add('logout', () => {
//   cy.clearCookie('next-auth.session-token')
// })

import { JWTPayload } from 'jose'
import { encode } from 'next-auth/jwt'
import 'cypress-file-upload'

Cypress.Commands.add('login', (userObj: JWTPayload) => {
  // Generate and set a valid cookie from the fixture that next-auth can decrypt
  cy.wrap(null)
    .then(() => {
      return encode({
        token: userObj,
        secret: Cypress.env('NEXTAUTH_JWT_SECRET'),
      })
    })
    .then((encryptedToken) => cy.setCookie('next-auth.session-token', encryptedToken))
})
