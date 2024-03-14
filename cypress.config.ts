import { defineConfig } from 'cypress'
const { GoogleSocialLogin } = require('cypress-social-logins').plugins

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      // implement node event listeners here
      on('task', {
        GoogleSocialLogin: GoogleSocialLogin,
      })
    },
    baseUrl: process.env.LOCAL_SERVER_URL,
    env: {
      // set environment variables here
      HASHTAG_SERVICE: process.env.HASHTAG_SERVICE,
      ACCOUNT_SERVICE: process.env.ACCOUNT_SERVICE,
      MEDIA_SERVICE: process.env.MEDIA_SERVICE,
      JWT_SECRET: process.env.JWT_SECRET,
      GOOGLE_USER: 'username@company.com',
      GOOGLE_PW: 'password',
      COOKIE_NAME: 'next-auth.session-token',
      SITE_NAME: process.env.LOCAL_SERVER_URL,
      NEXTAUTH_JWT_SECRET: process.env.JWT_SECRET,
    },
    chromeWebSecurity: false,
  },
})
