describe('Dashboard Workflow', () => {
    beforeEach(() => {
      cy.login(); // Assume you have a login command set up in Cypress
      cy.visit('/dashboard');
    });
  
    it('displays the correct fit score', () => {
      cy.contains('Resume Fit Score').should('be.visible');
      cy.contains('80%').should('be.visible'); // Example score
    });
  
    it('filters feedback by category', () => {
      cy.get('#filter').select('skills');
      cy.get('.feedback').should('have.length', 2); // Example number of filtered items
    });
  
    it('downloads the PDF report', () => {
      cy.get('.download-btn').click();
      cy.verifyDownload('Resume_Analysis_Report.pdf'); // Assuming a custom Cypress command for download verification
    });
  });
  