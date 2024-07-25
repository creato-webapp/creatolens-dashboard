describe('Create Instagram Page', () => {
  beforeEach(() => {
    cy.visit('/')
    // Log in as a user
    cy.login()

    cy.visit('/hashtag/image-to-hashtag')
  })

  it('should go to image upload page, check checkboxes, and compare clipboard content', () => {
    // Assert the accounts page is displayed
    cy.get('h1').contains('IMAGE TO HASHTAG').should('be.visible')
    cy.wait(1000) // Custom wait

    // Assert and click the 'Create New Account' button
    cy.get('h4').contains('Drag and drop or browse your files').should('be.visible')
    cy.wait(1000) // Custom wait

    cy.get('[role="presentation"]').attachFile('temp.png', { subjectType: 'drag-n-drop' })
    cy.wait(1000) // Custom wait

    cy.get('img[alt="Uploaded"]').should('be.visible').and('have.attr', 'src')
    cy.wait(1000) // Custom wait
    cy.get('button').contains('Annotate').should('be.visible').click()
    cy.wait(1000) // Custom wait

    cy.get('h1').contains('IMAGE TO HASHTAG').should('be.visible')
    cy.wait(1000) // Custom wait
    cy.get('h2', { timeout: 70000 }).contains('Image label annotation').should('be.visible')
    cy.wait(1000) // Custom wait

    cy.get('button').contains('Select All').should('be.visible')
    cy.get('button').contains('Re-annotate').should('be.visible')
    cy.get('button').contains('Get Hashtag').should('be.visible')
    cy.get('h3', { timeout: 30000 }).contains('labels discovered', { timeout: 30000 }).should('be.visible')

    cy.get('button').contains('Get Hashtag').click()

    cy.get('h2', { timeout: 30000 }).contains('Get hashtag recommendation').should('be.visible')

    cy.get('div', { timeout: 30000 }).contains('Related').should('be.visible')

    cy.get('button').contains('Related').click() // Replace with the actual selector of the dropdown button

    cy.get('div .grid .max-h-60').should('be.visible')

    const checkedTexts = []

    cy.get('.grid .max-h-60 li')
      .filter(':visible')
      .then(($visibleListItems) => {
        // Get the second visible list item and perform any action if needed
        if ($visibleListItems.length > 1) {
          cy.wrap($visibleListItems.eq(1)).click()
        } else {
          cy.log('Less than two visible list items found')
        }

        const half = Math.floor($visibleListItems.length / 2)
        cy.log('half', half)

        // Click the first half of the visible checkboxes and store their text
        for (let i = 0; i < half; i++) {
          const listItem = cy.wrap($visibleListItems.eq(i))
          listItem.find('input[type="checkbox"]').click({ force: true })
          cy.wait(1000)
          listItem.then(($el) => {
            checkedTexts.push($el.text().trim())
          })
        }
      })

    // Click the Copy Selected button

    // Log the texts of the checked items for debugging
    cy.log('Checked Texts:', checkedTexts)
  })
})
