import { User } from 'cypress/typings/user';

describe('Form API', () => {
  let user: User;
  let postRequestData: string;

  beforeEach(() => {
    cy.fixture('user-valid').then((loadedUser) => (user = loadedUser));
    cy.fixture('post-request-data').then((data) => (postRequestData = data.body));
  });

  it('should send the data to API and show success message', () => {
    cy.intercept('POST', 'https://demo-api.now.sh/users', { _id: 'fakeUserId123' }).as('getUsers');

    cy.submitForm(user);

    cy.get('@getUsers').its('request.body').should('deep.equal', postRequestData);

    cy.getByTestId('success').should('exist').should('contain.text', 'You are successfully signed up. Thank you!');
    cy.getByTestId('repeat-button').should('exist').should('contain.text', 'Sign up another person');

    cy.getByTestId('repeat-button').click();
    cy.submitForm(user);
    cy.getByTestId('success').should('exist');
  });

  it('should show the loading spinner on submit', () => {
    cy.intercept('POST', 'https://demo-api.now.sh/users');

    cy.submitForm(user);

    cy.getByTestId('loading').should('exist');
  });

  it('should show an error message if the API is down', () => {
    cy.intercept('POST', 'https://demo-api.now.sh/users', {
      forceNetworkError: true,
    });

    cy.submitForm(user);

    cy.getByTestId('api-error').should('exist').should('contain.text', 'Something went wrong. Please try again later.');
    cy.getByTestId('success').should('not.exist');
    cy.getByTestId('repeat-button').should('not.exist');
  });

  it('should show an error message if the API is down', () => {
    cy.intercept('POST', 'https://demo-api.now.sh/users', {
      statusCode: 500,
    });

    cy.submitForm(user);

    cy.getByTestId('api-error').should('exist').should('contain.text', 'Something went wrong. Please try again later.');
    cy.getByTestId('success').should('not.exist');
    cy.getByTestId('repeat-button').should('not.exist');
  });

  it('should allow to resubmit on network error', () => {
    cy.intercept('POST', 'https://demo-api.now.sh/users', {
      forceNetworkError: true,
    });

    cy.submitForm(user);

    cy.getByTestId('api-error').should('exist').should('contain.text', 'Something went wrong. Please try again later.');
    cy.getByTestId('success').should('not.exist');
    cy.getByTestId('repeat-button').should('not.exist');

    cy.intercept('POST', 'https://demo-api.now.sh/users', { _id: 'fakeUserId123' }).as('getUsers');

    cy.get('@submitButton').click();

    cy.get('@getUsers').its('request.body').should('deep.equal', postRequestData);
    cy.getByTestId('success').should('exist');
    cy.getByTestId('repeat-button').should('exist');
  });
});
