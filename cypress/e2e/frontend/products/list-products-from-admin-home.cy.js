const DataGenerator = require('../../../support/utils/DataGenerator');

describe('LIST PRODUCTS FROM ADMIN HOME — Frontend', () => {

  const registerAdmin = (baseURLFrontend) => {
    const admin = DataGenerator.generateValidUser();

    cy.visit(baseURLFrontend);
    cy.get('[data-testid="cadastrar"]').click();

    cy.url().should('include', '/cadastrarusuarios');

    cy.get('[data-testid="nome"]').type(admin.nome);
    cy.get('[data-testid="email"]').type(admin.email);
    cy.get('[data-testid="password"]').type(admin.password);
    cy.get('[data-testid="checkbox"]').check();

    cy.get('[data-testid="cadastrar"]').click();

    cy.url().should('include', '/admin/home');
    cy.get('[data-testid="logout"]').should('be.visible');
  };

  context('Happy Path', () => {
    it('given admin is logged in — when clicking Listar Produtos — then redirects to product list page', () => {
      cy.env(['baseURLFrontend']).then(({ baseURLFrontend }) => {
        registerAdmin(baseURLFrontend);

        cy.get('[data-testid="listarProdutos"]').click();

        cy.url().should('include', '/admin/listarprodutos');
        cy.get('h1').should('contain.text', 'Lista dos Produtos');
      });
    });

    it('given admin is on product list page — when page loads — then table with correct columns is displayed', () => {
      cy.env(['baseURLFrontend']).then(({ baseURLFrontend }) => {
        registerAdmin(baseURLFrontend);

        cy.get('[data-testid="listarProdutos"]').click();

        cy.url().should('include', '/admin/listarprodutos');

        cy.get('table').should('be.visible');
        cy.get('table thead th').should('have.length', 6);
        cy.get('table thead th').eq(0).should('contain.text', 'Nome');
        cy.get('table thead th').eq(1).should('contain.text', 'Preço');
        cy.get('table thead th').eq(2).should('contain.text', 'Descrição');
        cy.get('table thead th').eq(3).should('contain.text', 'Quantidade');
        cy.get('table thead th').eq(4).should('contain.text', 'Imagem');
        cy.get('table thead th').eq(5).should('contain.text', 'Ações');
      });
    });
  });
});
