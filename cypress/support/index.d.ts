declare namespace Cypress {
  interface Chainable {
    google_login(string?, string?): void
    logout(): void
    login: (arg: { name: string; email: string }) => void
  }
}
