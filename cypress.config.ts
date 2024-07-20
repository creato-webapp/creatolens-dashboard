import { defineConfig } from 'cypress'

const { GoogleSocialLogin } = require('cypress-social-logins').plugins

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      // implement node event listeners here
      on('task', {
        GoogleSocialLogin: GoogleSocialLogin,
      })
      on('before:browser:launch', (browser, launchOptions) => {
        console.log(launchOptions.args)
        let removeFlags = ['--enable-automation']
        launchOptions.args = launchOptions.args.filter((value) => !removeFlags.includes(value))
        return launchOptions
      })
    },
    baseUrl: 'http://localhost:3000',
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    testIsolation: false,
  },
})
