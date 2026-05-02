/**
 * @param {string} userId - The _id of the user to delete
 * @param {boolean} [failOnStatusCode=false]
 */
async function deleteUserUseCase(userId, failOnStatusCode = false) {
  const path = `/usuarios/${userId}`;

  cy.log(`[deleteUserUseCase] ► Initiating user deletion`);
  cy.log(`[deleteUserUseCase]   _id       : ${userId}`);
  cy.log(`[deleteUserUseCase]   endpoint  : DELETE ${endpoint}`);

  const response = await cy.apiDelete(endpoint, failOnStatusCode);
  cy.log(`[deleteUserUseCase] ◄ Response received`);
  cy.log(`[deleteUserUseCase]   status : ${response.status}`);
  cy.log(`[deleteUserUseCase]   body   : ${JSON.stringify(response.body)}`);

  return response;
}

module.exports = deleteUserUseCase;
