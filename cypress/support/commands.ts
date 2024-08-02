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

import { encode } from 'next-auth/jwt'
import 'cypress-file-upload'

Cypress.Commands.add('login', () => {
  // Generate and set a valid cookie from the fixture that next-auth can decrypt
  cy.fixture('user').then((user) => {
    cy.wrap(null)
      .then(() => {
        return encode({
          token: user,
          secret: Cypress.env('NEXTAUTH_JWT_SECRET'),
        })
      })
      .then((encryptedToken) => cy.setCookie('next-auth.session-token', encryptedToken))
  })
})

// cypress/support/commands.js
Cypress.Commands.add('loginByGoogleApi', () => {
  cy.log('Logging in to Google')
  cy.request({
    method: 'POST',
    url: 'https://www.googleapis.com/oauth2/v4/token',
    body: {
      grant_type: 'refresh_token',
      client_id: Cypress.env('googleClientId'),
      client_secret: Cypress.env('googleClientSecret'),
      refresh_token: Cypress.env('googleRefreshToken'),
    },
  }).then(({ body }) => {
    const { access_token, id_token } = body

    cy.request({
      method: 'GET',
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
      headers: { Authorization: `Bearer ${access_token}` },
    }).then(({ body }) => {
      cy.log(body)
      const userItem = {
        token: id_token,
        user: {
          googleId: body.sub,
          email: body.email,
          givenName: body.given_name,
          familyName: body.family_name,
          imageUrl: body.picture,
        },
      }

      window.localStorage.setItem('googleCypress', JSON.stringify(userItem))
      window.localStorage.setItem('idToken', JSON.stringify(id_token))
      cy.visit('/')
    })
  })
})
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
declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>
      // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}

// Prevent TypeScript from reading file as legacy script
export {}
