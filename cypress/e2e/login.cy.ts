import user from '../fixtures/google.json'
describe('Login page', () => {
  before(() => {
    cy.visit('/')
  })
  it('Login with Google', () => {
    // remove the two lines below if you need to stay logged in
    // for your remaining tests
    // const user = {
    //   name: 'Morty Smith',
    //   email: 'test@picklerick.com',
    //   image: '/path/to/butterbot.jpg',
    //   birthdate: '12/02/13',
    // }
    cy.login(user)
    cy.visit('/accounts')
    cy.contains('ACCOUNTS') // Replace 'Your Page Title Here' with a title or text present on your homepage
  })
})
