describe('Create Instagram Page', () => {
  it('should display create instagram page', () => {
    const user = {
      name: 'Morty Smith',
      email: 'test@picklerick.com',
      image: '/path/to/butterbot.jpg',
      birthdate: '12/02/13',
      role: ['player'],
      accountId: '1234',
    }

    cy.login(user)
    cy.visit('/accounts/create-account')

    cy.get('h1').contains('CREATE NEW ACCOUNT')
    cy.get('p').contains('Connect your Instagram account')

    // check if the form is present
    cy.get('form').should('be.visible')

    // check if the form fields are present
    cy.get('input[name="username"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
    cy.get('input[name="acknowledge"]').should('be.visible')
    cy.get('button').contains('Create').should('be.visible')

    // check if the form fields are empty
    cy.get('input[name="username"]').should('have.value', '')
    cy.get('input[type="password"]').should('have.value', '')
    cy.get('input[name="acknowledge"]').should('not.be.checked')

    const username = 'test_username'
    const password = 'test_password'
    cy.get('input[name="username"]').type(username).should('have.value', username)
    cy.get('input[type="password"]').type(password).should('have.value', password)
    cy.get('input[name="acknowledge"]').check().should('be.checked')

    // check the submit button is clickable
    // find button with type submit and check if it is enabled
    cy.get('button[type="submit"]').should('be.enabled')
    cy.get('button[type="submit"]').click()

    //
  })
})
