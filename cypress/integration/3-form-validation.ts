describe('Form validators', () => {
  it('should not allow to send an empty form', () => {
    cy.getByTestId('submit-button').click();

    // Should show an HTML5 error message.
    // Not needed to test all the other fields as it's a browser's native validator calls.
    // We are already checking the fields attributes in the initial state test.
    cy.getByTestId('first-name').invoke('prop', 'validationMessage').should('equal', 'Please fill in this field.');

    cy.getByTestId('first-name-errors').should('contain.text', 'First name is required.');
    cy.getByTestId('last-name-errors').should('contain.text', 'Last name is required.');
    cy.getByTestId('email-errors').should('contain.text', 'Email is required.');
    cy.getByTestId('password-errors').should('contain.text', 'Password is required.');
  });

  it('should not allow to send a wrong email format', () => {
    cy.getByTestId('email').type('wrongemail');
    cy.getByTestId('submit-button').click();
    cy.getByTestId('email-errors').should('contain.text', 'Please type the correct email.');

    cy.getByTestId('email').clear().type('wrongemail@');
    cy.getByTestId('submit-button').click();
    cy.getByTestId('email-errors').should('contain.text', 'Please type the correct email.');
  });

  it('should not allow to send a form with the password which contains user name', () => {
    cy.fixture('user-invalid').then((loadedUser) => {
      cy.submitForm(loadedUser);
      cy.getByTestId('password-errors').should(
        'contain.text',
        "Your password shouldn't contain your first or last name."
      );

      cy.getByTestId('password').clear().type('DoeSomeOtherPass');
      cy.getByTestId('password-errors').should(
        'contain.text',
        "Your password shouldn't contain your first or last name."
      );

      cy.getByTestId('password').clear().type('SomeJohnOtherDoePass');
      cy.getByTestId('password-errors').should(
        'contain.text',
        "Your password shouldn't contain your first or last name."
      );

      cy.getByTestId('first-name').clear().type('Some name with spaces');
      cy.getByTestId('password').clear().type('Some name with spacesPass');
      cy.getByTestId('password-errors').should(
        'contain.text',
        "Your password shouldn't contain your first or last name."
      );
    });
  });
});
