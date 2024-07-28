import { defineConfig } from 'cypress'
import plugin from './cypress/plugins/index'
import { config } from 'dotenv'

config()

export default defineConfig({
  // These settings apply everywhere unless overridden
  defaultCommandTimeout: 5000,
  viewportHeight: 1000,
  viewportWidth: 1280,
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
      return plugin(on, config)
    },
  },
  env: {
    mobileViewportWidthBreakpoint: 425,
    googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
})
