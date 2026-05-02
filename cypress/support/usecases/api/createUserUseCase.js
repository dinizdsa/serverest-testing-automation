async function createUserUseCase(payload, failOnStatusCode = false) {
  const path = '/usuarios';

  cy.log(`[createUserUseCase] ► Initiating user creation`);
  cy.log(`[createUserUseCase]   nome          : ${payload.nome}`);
  cy.log(`[createUserUseCase]   email         : ${payload.email}`);
  cy.log(`[createUserUseCase]   administrador : ${payload.administrador}`);
  cy.log(`[createUserUseCase]   endpoint      : POST ${baseURLApi}/${path}`);

  const response = await cy.apiPost(path, payload, failOnStatusCode);
  cy.log(`[createUserUseCase] ◄ Response received`);
  cy.log(`[createUserUseCase]   status : ${response.status}`);
  cy.log(`[createUserUseCase]   body   : ${JSON.stringify(response.body)}`);

  return response;
}

module.exports = createUserUseCase;