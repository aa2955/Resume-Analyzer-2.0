Cypress.Commands.add('login', (username = 'testuser', password = 'TestPassword123') => {
    cy.request('POST', 'http://127.0.0.1:8000/api/login', { username, password })
      .then((response) => {
        expect(response.status).to.eq(200);
        const token = response.body.token;
        window.localStorage.setItem('access_token', token);
      });
  });
  
  Cypress.Commands.add('verifyDownload', (fileName) => {
    const downloadsFolder = Cypress.config('downloadsFolder');
    cy.readFile(`${downloadsFolder}/${fileName}`).should('exist');
  });
  