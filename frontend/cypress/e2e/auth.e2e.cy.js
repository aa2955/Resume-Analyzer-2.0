describe('Authentication Workflow', () => {
    it('registers a new user', () => {
      cy.visit('/register');
      cy.get('#email').type('test@example.com');
      cy.get('#username').type('testuser');
      cy.get('#password').type('TestPassword123');
      cy.get('#confirm-password').type('TestPassword123');
      cy.get('button[type="submit"]').click();
      cy.contains('Registration successful').should('be.visible');
    });
  
    it('logs in an existing user', () => {
      cy.visit('/login');
      cy.get('#username').type('testuser');
      cy.get('#password').type('TestPassword123');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');
    });
  });
  