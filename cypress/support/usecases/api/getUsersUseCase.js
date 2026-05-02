const UserApiClient = require('../../api/apiClient');
/**
 * @param {Object} [filters={}] - Query params: { _id, nome, email, password, administrador }
 * @param {boolean} [failOnStatusCode=false]
 */
async function getUsersUseCase(filters = null, failOnStatusCode = false) {
  const path = '/usuarios';
  const apiClient = new UserApiClient();

  cy.log(`[getUsersUseCase] ► Initiating list users`);
  cy.log(`[getUsersUseCase]   filters   : ${JSON.stringify(filters)}`);
  cy.log(`[getUsersUseCase]   endpoint  : GET ${path}`);

  const response = await apiClient.getUsers(filters, failOnStatusCode);
  cy.log(`[getUsersUseCase] ◄ Response received`);
  cy.log(`[getUsersUseCase]   status    : ${response.status}`);
  cy.log(`[getUsersUseCase]   quantidade: ${response.body.quantidade}`);
  cy.log(`[getUsersUseCase]   body      : ${JSON.stringify(response.body)}`);

  return response;
}

module.exports = getUsersUseCase;