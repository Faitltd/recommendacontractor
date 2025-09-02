describe('Sign In page', () => {
  it('renders provider buttons and explanatory text', () => {
    // Use the /auth/login page (our UI) to avoid redirect loops from Auth.js handler
    cy.visit('/auth/login');

    // Heading
    cy.contains('Sign in to your account').should('be.visible');

    // Buttons
    cy.contains('button', 'Continue with Facebook').should('be.visible');
    cy.contains('button', 'Continue with Google').should('be.visible');
  });
});

