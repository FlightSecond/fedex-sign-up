describe('Initial page', () => {
  it('should have correct page title', () => {
    cy.title().should('equal', 'FedEx Sign-up');
  });

  it('should have basic elements', () => {
    cy.get('header').find('img').should('have.attr', 'src', 'assets/images/logo.png');
    cy.get('header').find('img').should('have.attr', 'alt', 'FedEx');
    cy.get('h1').should('have.text', 'Sign-up');
  });
});

describe('Initial form', () => {
  it('should have correct fields', () => {
    cy.getByTestId('first-name')
      .should('have.value', '')
      .should('have.attr', 'type', 'text')
      .should('have.attr', 'required', 'required');
    cy.getByTestId('last-name')
      .should('have.value', '')
      .should('have.attr', 'type', 'text')
      .should('have.attr', 'required', 'required');
    cy.getByTestId('email')
      .should('have.value', '')
      .should('have.attr', 'type', 'email')
      .should('have.attr', 'required', 'required');
    cy.getByTestId('password')
      .should('have.value', '')
      .should('have.attr', 'type', 'password')
      .should('have.attr', 'required', 'required')
      .should('have.attr', 'pattern', '(?=.*[a-z])(?=.*[A-Z]).{8,}');
  });

  it('should have submit button', () => {
    cy.getByTestId('submit-button').should('contain.text', 'Sign up');
  });

  it('should have correct labels', () => {
    cy.getByTestId('sign-up-form').find('label[for="firstName"]').should('contain.text', 'First name *');
    cy.getByTestId('sign-up-form').find('label[for="lastName"]').should('contain.text', 'Last name *');
    cy.getByTestId('sign-up-form').find('label[for="email"]').should('contain.text', 'Email address *');
    cy.getByTestId('sign-up-form').find('label[for="password"]').should('contain.text', 'Password *');
  });

  it('should have correct hints', () => {
    cy.getByTestId('sign-up-form')
      .should('contain.text', "We'll never share your email with anyone else.")
      .should(
        'contain.text',
        "Your password must be at least 8 characters long, contain at least one lower and one uppercase latin letter and shouldn't contain your first or last name."
      );
  });
});
