describe('Authentication Tests', () => {
  it('registers a new user', () => {
    cy.visit('/register'); // Navigate to the register page
    cy.get('#email').type('test@example.com'); // Enter email
    cy.get('#username').type('testuser'); // Enter username
    cy.get('#password').type('TestPassword123'); // Enter password
    cy.get('#confirm-password').type('TestPassword123'); // Confirm password
    cy.get('button[type="submit"]').click(); // Submit registration form

    // Validate success message
    cy.contains('Registration successful', { timeout: 10000 });
  });

  it('logs in an existing user', () => {
    // Intercept the login API call
    cy.intercept('POST', 'http://127.0.0.1:8000/api/login').as('loginRequest');
  
    // Visit the login page
    cy.visit('/login');
    cy.get('#username').type('testuser'); // Enter username
    cy.get('#password').type('TestPassword123'); // Enter password
    cy.get('button[type="submit"]').click(); // Submit login form
  
    // Wait for the login API request and validate the response
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
  
    // Confirm navigation to the home page
    cy.url().should('eq', 'http://localhost:5173/');
  
    // Validate that the access token is stored in localStorage
    cy.window().then((win) => {
      const token = win.localStorage.getItem('access_token');
      expect(token).to.exist;
    });
  });
  

  it('displays an error for invalid credentials', () => {
    cy.visit('/login'); // Navigate to the login page
    cy.get('#username').type('invaliduser'); // Enter invalid username
    cy.get('#password').type('InvalidPassword123'); // Enter invalid password
    cy.get('button[type="submit"]').click(); // Submit login form

    // Check for error message
    cy.contains('Invalid username or password', { timeout: 10000 });
  });
});
