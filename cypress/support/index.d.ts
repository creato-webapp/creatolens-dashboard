declare namespace Cypress {
  interface Chainable {
    google_login(string?, string?): void
    logout(): void
    login: () => void
  }
}
