import { faker } from '@faker-js/faker';

export default class DataGenerator {
  /**
   * Generates a valid user payload.
   * @param {boolean} isAdmin - Defines if the user is an administrator.
   */
  static generateValidUser(overrides = {}) {
    return {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: true,
      ...overrides,
    };
  }

  static generateInvalidEmailUser() {
    const user = this.generateValidUser();
    user.email = "invalid-email-format";
    return user;
  }
}