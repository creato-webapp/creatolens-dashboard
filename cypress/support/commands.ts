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
import hkdf from '@panva/hkdf'
import { EncryptJWT, JWTPayload } from 'jose'

// Function logic derived from https://github.com/nextauthjs/next-auth/blob/5c1826a8d1f8d8c2d26959d12375704b0a693bfc/packages/next-auth/src/jwt/index.ts#L113-L121
async function getDerivedEncryptionKey(secret: string) {
  return await hkdf('sha256', secret, '', 'NextAuth.js Generated Encryption Key', 32)
}

export async function encode(token: JWTPayload, secret: string): Promise<string> {
  const maxAge = 30 * 24 * 60 * 60 // 30 days
  const encryptionSecret = await getDerivedEncryptionKey(secret)
  return await new EncryptJWT(token)
    .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
    .setIssuedAt()
    .setExpirationTime(Math.round(Date.now() / 1000 + maxAge))
    .setJti('test')
    .encrypt(encryptionSecret)
}
Cypress.Commands.add('login', (userObj: JWTPayload) => {
  // Generate and set a valid cookie from the fixture that next-auth can decrypt
  cy.wrap(null)
    .then(() => {
      return encode(userObj, Cypress.env('NEXTAUTH_JWT_SECRET'))
    })
    .then((encryptedToken) => cy.setCookie('next-auth.session-token', encryptedToken))

  cy.visit('/')
  cy.get('button').contains('Logout').should('be.visible')
})

Cypress.Commands.add('google_login', () => {
  // Generate and set a valid cookie from the fixture that next-auth can decrypt

  cy.visit(Cypress.env('SITE_NAME'))
  const username = Cypress.env('GOOGLE_USER')
  const password = Cypress.env('GOOGLE_PW')
  const loginUrl = Cypress.env('SITE_NAME')

  const socialLoginOptions = {
    username,
    password,
    loginUrl,
    headless: false,
    logs: true,
    isPopup: false,
    // loginSelector: , //className of the login button with css selector
    loginSelector: `button[id="login"]`,
    postLoginSelector: 'button[id="logout-button"]',
    // cookieName,
  }

  // cy looks for button with id="login" is visible
  cy.clearCookies()

  return cy.task('GoogleSocialLogin', socialLoginOptions).then(({ cookies }) => {
    cy.clearCookies()

    cookies.forEach((cookie) => {
      if (cookie) {
        cy.setCookie(cookie.name, cookie.value, {
          domain: cookie.domain,
          expiry: cookie.expires,
          httpOnly: cookie.httpOnly,
          path: cookie.path,
          secure: cookie.secure,
        })
      } else {
        cy.log('no cookie')
      }
    })
  })
})

Cypress.Commands.add('logout', () => {
  cy.clearCookie('next-auth.session-token')
})
