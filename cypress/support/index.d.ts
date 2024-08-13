declare namespace Cypress {
  interface Chainable {
    google_login(): void
    logout(): void
    login: () => void
    loginByGoogleApi(): void
    loginToAuth0ViaSocial(SOCIAL_PROVIDER: 'google'): void
  }
}
