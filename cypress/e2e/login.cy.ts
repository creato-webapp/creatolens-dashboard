describe('Login page', () => {
  it('Login with Google', () => {
    cy.visit('/')
    // cy.login({ fixture: 'session.json' })
    // cy.google_login(¸)

    const user = {
      name: 'Morty Smith',
      email: 'test@picklerick.com',
      image: '/path/to/butterbot.jpg',
      birthdate: '12/02/13',
    }

    cy.login(user)

    cy.visit('/accounts')
  })
})
