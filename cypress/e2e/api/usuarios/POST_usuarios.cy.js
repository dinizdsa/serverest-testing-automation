const createUserUseCase = require('../../../support/usecases/api/createUserUseCase');
const DataGenerator     = require('../../../support/utils/DataGenerator');
const API_MESSAGES      = require('../../../support/constants/apiMessages');

describe('POST /usuarios — User Registration', () => {

  context('Happy Path', () => {
    it('should create an account with a valid email (administrador=true) - 201', () => {
      const payload = DataGenerator.generateValidUser({ administrador: 'true' });
      cy.log(`[Test] Payload: ${JSON.stringify(payload)}`);
      createUserUseCase(payload).then((response) => {
        expect(response.headers['content-type']).to.include('application/json');
        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal(API_MESSAGES.USUARIO_CADASTRADO);
        expect(response.body._id).to.be.a('string').and.have.length.greaterThan(0);
      });
    });


    it('should create an account with a valid email (administrador=false) - 201', () => {
      const payload = DataGenerator.generateValidUser({ administrador: 'false' });
      cy.log(`[Test] Payload: ${JSON.stringify(payload)}`);
      createUserUseCase(payload).then((response) => {
        expect(response.headers['content-type']).to.include('application/json');
        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal(API_MESSAGES.USUARIO_CADASTRADO);
        expect(response.body._id).to.be.a('string').and.have.length.greaterThan(0);
      });
    });
  });

  context('Business Rule — Duplicate Email', () => {
    it('should return 400 when trying to register an already used email - 400', () => {
      const payload = DataGenerator.generateValidUser();
      createUserUseCase(payload).then(() => {
        createUserUseCase(payload).then((response) => {
          expect(response.status).to.equal(400);
          expect(response.body.message).to.equal(API_MESSAGES.EMAIL_JA_UTILIZADO);
        });
      });
    });
  });

  context('Edge Cases — Invalid Email Format', () => {
    const invalidEmails = [
      { label: 'missing @ symbol',   email: 'invalidemail.com' },
      { label: 'missing domain',     email: 'user@' },
      { label: 'missing local part', email: '@domain.com' },
      { label: 'plain string',       email: 'notanemail' },
      { label: 'spaces in email',    email: 'user @domain.com' },
    ];

    invalidEmails.forEach(({ label, email }) => {
      it(`given invalid email (${label}) — when creating user — then returns 400`, () => {
        const payload = DataGenerator.generateValidUser({ email });
        cy.log(`[Test] email value: "${email}"`);
        createUserUseCase(payload).then((response) => {
          expect(response.status).to.equal(400);
        });
      });
    });
  });

  context('Edge Cases — Missing Required Fields', () => {
    it('given payload without nome — when creating user — then returns 400', () => {
      const payload = DataGenerator.generateValidUser({ nome: '' });
      createUserUseCase(payload).then((response) => {
        expect(response.status).to.equal(400);
      });
    });

    it('given payload without email — when creating user — then returns 400', () => {
      const payload = DataGenerator.generateValidUser({ email: '' });
      createUserUseCase(payload).then((response) => {
        expect(response.status).to.equal(400);
      });
    });

    it('given payload without password — when creating user — then returns 400', () => {
      const payload = DataGenerator.generateValidUser({ password: '' });
      createUserUseCase(payload).then((response) => {
        expect(response.status).to.equal(400);
      });
    });

    it('given empty payload — when creating user — then returns 400', () => {
      createUserUseCase({}).then((response) => {
        expect(response.status).to.equal(400);
      });
    });
  });

  context('Edge Cases — administrador Field', () => {
    it('given administrador="maybe" — when creating user — then returns 400', () => {
      const payload = DataGenerator.generateValidUser({ administrador: 'maybe' });
      createUserUseCase(payload).then((response) => {
        expect(response.status).to.equal(400);
      });
    });
  });
});