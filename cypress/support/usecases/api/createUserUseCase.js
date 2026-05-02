const UserApiClient = require('../../api/apiClient');
async function createUserUseCase(payload, failOnStatusCode = false) {
  const path = '/usuarios';
  const apiClient = new UserApiClient();

  cy.log(`[createUserUseCase] ► Initiating user creation`);
  cy.log(`[createUserUseCase]   nome          : ${payload.nome}`);
  cy.log(`[createUserUseCase]   email         : ${payload.email}`);
  cy.log(`[createUserUseCase]   administrador : ${payload.administrador}`);
  cy.log(`[createUserUseCase]   endpoint      : POST ${path}`);

  const response = await apiClient.createUser(path, payload, failOnStatusCode);
  cy.log(`[createUserUseCase] ◄ Response received`);
  cy.log(`[createUserUseCase]   status : ${response.status}`);
  cy.log(`[createUserUseCase]   body   : ${JSON.stringify(response.body)}`);

  return response;
}

module.exports = createUserUseCase;