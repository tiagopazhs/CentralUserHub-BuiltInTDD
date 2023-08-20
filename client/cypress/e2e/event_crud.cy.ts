describe('Event crud', () => {
  it('Should list all users', () => {
    cy.task('db:erase');
    cy.visit('http://localhost:5173');
    cy.contains('Kiko')
  });

  it('Should create an user', () => {
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

  it.only('Should delete an user', () => {
    cy.visit('http://localhost:5173');
    cy.get('.MuiTableBody-root > :nth-child(1) > .column-id').click();
    cy.get('.MuiButton-text').click();
    cy.contains('Element deleted')
  });

})

// describe('Event CRUD', () => {

//   beforeEach(() => {
//     cy.task('db:erase');
//     cy.visit('http://localhost:3000');
//   });

//   it('Deve listar todos os eventos', () => {
//     cy.task('db:create', {
//       name: 'Rock in Rio',
//       date: '2024-01-01'
//     });
//     cy.contains('Rock in Rio');
//   });

//   it('Deve criar um novo evento', () => {
//     cy.get('.RaCreateButton-root').click();
//     cy.get('#name').type('AWS Summit');
//     cy.get('#date').type('2023-03-03');
//     cy.get('.RaToolbar-defaultToolbar > .MuiButtonBase-root').click();
//     cy.contains('Element created');
//     cy.visit('http://localhost:3000');
//     cy.contains('AWS Summit');
//   });

//   it('Deve remover um evento', () => {
//     cy.task('db:create', {
//       name: 'Rock in Rio',
//       date: '2024-01-01'
//     });
//     cy.get('.MuiTableBody-root > :nth-child(1)').click();
//     cy.get('.ra-delete-button').click();
//     cy.contains('Element deleted');
//   });

//   it('Deve atualizar um evento', () => {
//     cy.task('db:create', {
//       name: 'Rock in Rio',
//       date: '2024-01-01'
//     });
//     cy.get('.MuiTableBody-root > :nth-child(1)').click();
//     cy.get('#name').clear().type('AWS Summit');
//     cy.get('#date').clear().type('2024-03-03');
//     cy.get('.RaToolbar-defaultToolbar > .MuiButton-contained').click();
//     cy.contains('Element updated');
//     cy.contains('AWS Summit');
//   });
// });