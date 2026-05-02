const DataGenerator = require('../../../support/utils/DataGenerator');
const createUserUseCase = require('../../../support/usecases/api/createUserUseCase');
const API_MESSAGES = require('../../../support/constants/apiMessages');

describe('CREATE USER — Frontend', () => {

const createUser = (baseURLFrontend, user, isAdmin = true) => {
  cy.visit(`${baseURLFrontend}`);
  cy.get('[data-testid="cadastrar"]').click();

  cy.url().should('include', '/cadastrarusuarios');

  cy.get('[data-testid="nome"]').type(user.nome);
  cy.get('[data-testid="email"]').type(user.email);
  cy.get('[data-testid="password"]').type(user.password);
  if (isAdmin) {
    cy.get('[data-testid="checkbox"]').check();
  } else {
    cy.get('[data-testid="checkbox"]').uncheck();
  }

  cy.get('[data-testid="cadastrar"]').click();
}

  context('Happy Path', () => {
    it('given valid data with administrador checked — when submitting — then redirects to home', () => {
      cy.env(['baseURLFrontend']).then(({ baseURLFrontend }) => {
        const user = DataGenerator.generateValidUser();

        createUser(baseURLFrontend, user);

        cy.url().should('include', '/admin/home');
        cy.get('[data-testid="cadastrar-usuarios"]').should('be.visible');
        cy.get('[data-testid="logout"]').should('be.visible');
      });
    });

    it('given valid data without administrador checked — when submitting — then redirects to home', () => {
      cy.env(['baseURLFrontend']).then(({ baseURLFrontend }) => {
        const user = DataGenerator.generateValidUser();

        createUser(baseURLFrontend, user, false);

        cy.url().should('not.contain', '/admin');
        cy.url().should('include', '/home');
        cy.get('[data-testid="logout"]').should('be.visible');
      });
    });
  });

  context('Business Rule — Duplicate Email', () => {
    it('given an email already registered — when submitting — then shows error alert', () => {
      cy.env(['baseURLFrontend']).then(({ baseURLFrontend }) => {
        const user = DataGenerator.generateValidUser({ administrador: 'true' });
        createUser(baseURLFrontend, user);
        createUser(baseURLFrontend, user);

        cy.get('.alert')
          .should('be.visible')
          .find('span')
          .should('contain.text', API_MESSAGES.EMAIL_JA_UTILIZADO);

        cy.url().should('include', '/cadastrarusuarios');
      });
    });
  });
});
