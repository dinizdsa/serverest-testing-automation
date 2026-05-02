// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('apiPost', (path, payload, failOnStatusCode = false) => {
    cy.env(['baseURLApi']).then(({ baseURLApi }) => {
        cy.request({
            method: 'POST',
            url: `${baseURLApi}${path}`,
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: payload,
            failOnStatusCode,
        });
    });
});

Cypress.Commands.add('apiGet', (path, filters = null, failOnStatusCode = false) => {
    cy.env(['baseURLApi']).then(({ baseURLApi }) => {
        cy.request({
            method: 'GET',
            url: `${baseURLApi}${path}`,
            headers: {
              'Accept': 'application/json',
            },
            qs: filters,
            failOnStatusCode,
        });
    });
});

Cypress.Commands.add('apiDelete', (path, failOnStatusCode = false) => {
  cy.env(['baseURLApi']).then(({ baseURLApi }) => {
    cy.request({
      method: 'DELETE',
      url: `${baseURLApi}${path}`,
      headers: {
        'Accept': 'application/json',
      },
      failOnStatusCode,
    });
  });
});