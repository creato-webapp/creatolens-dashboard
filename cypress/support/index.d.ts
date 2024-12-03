declare namespace Cypress {
  interface Chainable {
    logout(): void
    login(SOCIAL_PROVIDER: 'google'): void
    login_google_second_time(): void
  }
}
