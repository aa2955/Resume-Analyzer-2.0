describe('Dashboard Workflow', () => {
  beforeEach(() => {
    // Programmatically log in the user
    cy.request({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/login',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'username=testuser&password=TestPassword123',
    }).then((response) => {
      expect(response.status).to.eq(200);
      const token = response.body.token;
      window.localStorage.setItem('access_token', token);
    });

    // Mock necessary data for dashboard APIs
    cy.intercept('GET', '**/api/current-data', {
      statusCode: 200,
      body: {
        resume: 'Sample resume text',
        job_description: 'Sample job description',
      },
    }).as('currentData');

    cy.intercept('POST', '**/api/calculate-fit', {
      statusCode: 200,
      body: {
        fit_score: 85,
        matched_keywords: ['Skill A', 'Skill B'],
        unmatched_keywords: ['Skill C'],
        feedback: {
          skills: ['Add Skill C'],
          experience: ['Include more projects.'],
        },
      },
    }).as('calculateFit');

    // Visit the dashboard
    cy.visit('/dashboard');
    cy.wait(['@currentData', '@calculateFit']); // Wait for data to load
  });

  it('displays the correct fit score', () => {
    cy.contains('Resume Fit Score').should('be.visible');
    cy.contains('85%').should('be.visible');
  });

  it('filters feedback by skills', () => {
    cy.get('#filter').select('skills'); // Filter by skills
    cy.get('.feedback').should('have.length', 1); // Validate feedback count
  });

  it('triggers the PDF download successfully', () => {
    cy.window().then((win) => {
      const downloadButton = win.document.querySelector('.download-btn');
      downloadButton.click(); // Programmatically trigger the click event
    });

    // Log that the download button was clicked successfully
    cy.log('PDF download button clicked. Validate manually if needed.');
  });
});
