describe('Resume Upload Workflow', () => {
    beforeEach(() => {
      // Programmatically register the user
      cy.request({
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/register',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'username=testuser&email=testuser@example.com&password=TestPassword123',
        failOnStatusCode: false, // Prevent test failure if the user is already registered
      }).then((response) => {
        if (response.status !== 201 && response.body.detail !== 'Username already registered') {
          throw new Error('User registration failed');
        }
      });
  
      // Programmatically log in the user
      cy.request({
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/login',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'username=testuser&password=TestPassword123',
      }).then((response) => {
        expect(response.status).to.eq(200);
        // Store the token in localStorage
        window.localStorage.setItem('access_token', response.body.token);
      });
  
      // Visit the resume upload page
      cy.visit('/resume-upload');
      cy.url().should('include', '/resume-upload');
    });
  
    it('uploads a valid PDF resume successfully', () => {
      cy.get('input[type="file"]').attachFile('valid_resume.pdf');
      cy.get('button[type="submit"]').click();
      cy.contains('Uploaded Successfully', { timeout: 10000 }).should('be.visible');
    });
  
    it('shows an error for invalid file types', () => {
      cy.get('input[type="file"]').attachFile('invalid_file.txt');
      cy.get('button[type="submit"]').click();
      cy.contains('Please upload a valid PDF or DOCX file.', { timeout: 10000 }).should('be.visible');
    });
  });
  