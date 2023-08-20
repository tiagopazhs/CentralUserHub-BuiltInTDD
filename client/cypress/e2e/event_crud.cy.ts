describe('Event crud', () => {
  
  beforeEach(() => {
    cy.task('db:erase');
    cy.visit('http://localhost:5173');
  });

  it.only('Should create an user', () => {
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

  it('Should read all users', () => {
    cy.contains('Kiko')
  });

  it('Should update an user', () => {
    cy.get('.MuiTableBody-root > :nth-child(1) > .column-id').click();
    cy.get('#email').clear().type('contatoUpdated@capital.com');
    cy.get('.RaToolbar-defaultToolbar > .MuiButton-contained').click();
    cy.contains('Element updated');
    cy.visit('http://localhost:5173');
    cy.contains('contatoUpdated@capital.com');
  });

  it('Should delete an user', () => {
    cy.get('.MuiTableBody-root > :nth-child(1) > .column-id').click();
    cy.get('.MuiButton-text').click();
    cy.contains('Element deleted')
  });

})
