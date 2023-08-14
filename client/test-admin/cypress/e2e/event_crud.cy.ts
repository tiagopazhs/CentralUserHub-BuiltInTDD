describe('Event crud', () => {
  it('Should list all users', () => {
    cy.visit('http://localhost:5173');
    cy.contains('Kiko')
  });

  it.only('Should create an user', () => {
    cy.visit('http://localhost:5173');
    cy.get('.RaCreateButton-root').click();
    cy.get('#name').type('Kiko Zambianchi');
    cy.get('#email').type('contato@capital.com');
    cy.get('#password').type('dinho@123');
    cy.get('.MuiInputAdornment-root > .MuiButtonBase-root').click();
    cy.get('.RaToolbar-defaultToolbar > .MuiButtonBase-root').click();
    cy.contains('created');
    cy.visit('http://localhost:5173');
    cy.contains('Kiko Zambianchi');
    cy.contains('contato@capital.com');
  });

})