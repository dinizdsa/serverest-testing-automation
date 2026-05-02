const DataGenerator = require('../../../support/utils/DataGenerator');

describe('CREATE USER FROM ADMIN HOME — Frontend', () => {

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

  const createUserFromAdmin = (user, isAdmin = true) => {
    cy.get('[data-testid="cadastrarUsuarios"]').click();

    cy.url().should('include', '/admin/cadastrarusuarios');

    cy.get('[data-testid="nome"]').type(user.nome);
    cy.get('[data-testid="email"]').type(user.email);
    cy.get('[data-testid="password"]').type(user.password);

    if (isAdmin) {
      cy.get('[data-testid="checkbox"]').check();
    } else {
      cy.get('[data-testid="checkbox"]').uncheck();
    }

    cy.get('[data-testid="cadastrarUsuario"]').click();
  };

  context('Happy Path', () => {
    it('given admin is logged in — when creating user with administrador checked — then user appears in the list', () => {
      cy.env(['baseURLFrontend']).then(({ baseURLFrontend }) => {
        registerAdmin(baseURLFrontend);

        const newUser = DataGenerator.generateValidUser();
        createUserFromAdmin(newUser, true);

        cy.url().should('include', '/admin/listarusuarios');

        cy.get('table tbody tr').contains('td', newUser.email)
          .parent('tr')
          .within(() => {
            cy.get('td').eq(0).should('contain.text', newUser.nome);
            cy.get('td').eq(1).should('contain.text', newUser.email);
            cy.get('td').eq(2).should('contain.text', newUser.password);
            cy.get('td').eq(3).should('contain.text', 'true');
          });
      });
    });

    it('given admin is logged in — when creating user without administrador checked — then user appears in the list', () => {
      cy.env(['baseURLFrontend']).then(({ baseURLFrontend }) => {
        registerAdmin(baseURLFrontend);

        const newUser = DataGenerator.generateValidUser();
        createUserFromAdmin(newUser, false);

        cy.url().should('include', '/admin/listarusuarios');

        cy.get('table tbody tr').contains('td', newUser.email)
          .parent('tr')
          .within(() => {
            cy.get('td').eq(0).should('contain.text', newUser.nome);
            cy.get('td').eq(1).should('contain.text', newUser.email);
            cy.get('td').eq(2).should('contain.text', newUser.password);
            cy.get('td').eq(3).should('contain.text', 'false');
          });
      });
    });
  });
});
