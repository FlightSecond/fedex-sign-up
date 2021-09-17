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
  cy.getByTestId('first-name').type(user.firstName);
  cy.getByTestId('last-name').type(user.lastName);
  cy.getByTestId('email').type(user.email);
  cy.getByTestId('password').type(user.password);
  cy.getByTestId('submit-button').click();
});
