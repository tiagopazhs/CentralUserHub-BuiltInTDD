describe('Event crud', () => {
  it('Should list all users', () => {
    cy.visit('http://localhost:5173');
    cy.contains('Kiko')
  });


})