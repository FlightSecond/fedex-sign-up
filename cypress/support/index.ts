import './commands';

beforeEach(() => {
  cy.visit('/');

  cy.getByTestId('sign-up-form').as('form');

  cy.get('@form').getByTestId('first-name-label').as('firstNameLabel');
  cy.get('@form').getByTestId('first-name').as('firstNameInput');

  cy.get('@form').getByTestId('last-name-label').as('lastNameLabel');
  cy.get('@form').getByTestId('last-name').as('lastNameInput');

  cy.get('@form').getByTestId('email-label').as('emailLabel');
  cy.get('@form').getByTestId('email').as('emailInput');

  cy.get('@form').getByTestId('password-label').as('passwordLabel');
  cy.get('@form').getByTestId('password').as('passwordInput');

  cy.get('@form').getByTestId('submit-button').as('submitButton');
});
