describe('Dashboard Workflow', () => {
  beforeEach(() => {
    // Programmatically register the user (if not already registered)
    cy.request({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/register',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'username=testuser&email=testuser@example.com&password=TestPassword123',
      failOnStatusCode: false, // Continue even if the user is already registered
    });

    // Programmatically log in the user
    cy.request({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/login',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'username=testuser&password=TestPassword123',
    }).then((response) => {
      expect(response.status).to.eq(200);
      const token = response.body.token;
      // Store the token in localStorage
      window.localStorage.setItem('access_token', token);
    });

    // Visit the dashboard
    cy.visit('/dashboard');
    cy.url().should('include', '/dashboard');
  });

  it('displays the correct fit score', () => {
    cy.contains('Resume Fit Score').should('be.visible');
    cy.contains('80%').should('be.visible'); // Adjust based on your application data
  });

  it('filters feedback by skills', () => {
    cy.get('#filter').select('skills');
    cy.get('.feedback').should('have.length', 2); // Adjust based on expected feedback data
  });

  it('downloads the PDF report successfully', () => {
    // Stub the download request
    cy.intercept('GET', '**/Resume_Analysis_Report.pdf', (req) => {
      req.reply({
        statusCode: 200,
        body: 'PDF Content',
        headers: {
          'Content-Type': 'application/pdf',
        },
      });
    });

    cy.get('.download-btn').click();

    // Verify the download
    cy.readFile('cypress/downloads/Resume_Analysis_Report.pdf').should('exist');
  });
});
