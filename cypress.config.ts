import { defineConfig } from 'cypress'
import plugin from './cypress/plugins/index'
import { config } from 'dotenv'
import fs from 'fs'

config()

export default defineConfig({
  // These settings apply everywhere unless overridden
  defaultCommandTimeout: 5000,
  viewportHeight: 1000,
  viewportWidth: 1280,
  video: true,
  chromeWebSecurity: false,
  experimentalModifyObstructiveThirdPartyCode: true,
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
  e2e: {
    baseUrl: 'http://localhost:3003',
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      // Remove --enable-automation flag
      on('before:browser:launch', (browser, launchOptions) => {
        const removeFlags = ['--enable-automation']
        launchOptions.args = launchOptions.args.filter((value) => !removeFlags.includes(value))
        return launchOptions
      }),
        on('after:spec', (spec: Cypress.Spec, results: CypressCommandLine.RunResult) => {
          if (results && results.video) {
            // Do we have failures for any retry attempts?
            const failures = results.tests.some((test) => test.attempts.some((attempt) => attempt.state === 'failed'))
            if (!failures) {
              // delete the video if the spec passed and no tests retried
              fs.unlinkSync(results.video)
            }
          }
        })
      return plugin(on, config)
    },
  },
  env: {
    mobileViewportWidthBreakpoint: 425,
    googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    SITE_NAME: 'http://localhost:3003',
  },
})
