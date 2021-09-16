import { User } from 'cypress/typings/user';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-testid attribute.
       * @example cy.getByTestId('greeting')
       */
      getByTestId(value: string): Chainable<Element>;

      /**
       * Custom command to submit the form with the user data.
       * @example cy.submitForm(user)
       */
      submitForm(user: User): void;
    }
  }
}

Cypress.Commands.add('getByTestId', (value) => {
  cy.get(`[data-testid="${value}"]`);
});

Cypress.Commands.add('submitForm', (user) => {
  cy.get('@firstNameInput').type(user.firstName);
  cy.get('@lastNameInput').type(user.lastName);
  cy.get('@emailInput').type(user.email);
  cy.get('@passwordInput').type(user.password);
  cy.get('@submitButton').click();
});
