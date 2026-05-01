class UserApiClient {
  constructor() {
    this.endpoint = '/usuarios';
  }

  /**
   * POST /usuarios
   * @param {Object} payload - { nome, email, password, administrador }
   * @param {boolean} failOnStatusCode - false = allow 4xx/5xx assertions
   */
  async createUser(payload, failOnStatusCode = false) {
    const { baseURLApi } = await cy.env(['baseURLApi']);
    return cy.request({
        method: 'POST',
        url:    `${baseURLApi}${this.endpoint}`,
        headers: {
            'Content-Type': 'application/json',
            'Accept':       'application/json',
        },
        body: payload,
        failOnStatusCode,
    });
  }
}

module.exports = UserApiClient;