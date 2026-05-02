const createUserUseCase = require('../../../support/usecases/api/createUserUseCase');
const deleteUserUseCase = require('../../../support/usecases/api/deleteUserUseCase');
const getUsersUseCase = require('../../../support/usecases/api/getUsersUseCase');
const DataGenerator = require('../../../support/utils/DataGenerator');
const API_MESSAGES = require('../../../support/constants/apiMessages');

describe('DELETE /usuarios/:_id — Delete User', () => {

  it('given an existing user — when deleting by _id — then returns 200 with success message', () => {
    createUserUseCase(DataGenerator.generateValidUser()).then((createResponse) => {
      const userId = createResponse.body._id;

      deleteUserUseCase(userId).then((deleteResponse) => {
        expect(deleteResponse.status).to.equal(200);
        expect(deleteResponse.body.message).to.equal(API_MESSAGES.USUARIO_EXCLUIDO);
      });
    });
  });

  it('given a non-existent _id — when deleting — then returns 200 with no record message', () => {
    const fakeId = 'NONEXISTENTID0000';

    deleteUserUseCase(fakeId).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal(API_MESSAGES.NENHUM_REGISTRO_EXCLUIDO);
    });
  });

  it('given a deleted user — when listing by that _id — then quantidade is 0', () => {
    createUserUseCase(DataGenerator.generateValidUser()).then((createResponse) => {
      const userId = createResponse.body._id;

      deleteUserUseCase(userId).then(() => {
        getUsersUseCase({ _id: userId }).then((getResponse) => {
          expect(getResponse.status).to.equal(200);
          expect(getResponse.body.quantidade).to.equal(0);
          expect(getResponse.body.usuarios).to.be.empty;
        });
      });
    });
  });

  it('given an already deleted user — when deleting again — then returns 200 with no record message', () => {
    createUserUseCase(DataGenerator.generateValidUser()).then((createResponse) => {
      const userId = createResponse.body._id;

      deleteUserUseCase(userId).then((firstDelete) => {
        expect(firstDelete.body.message).to.equal(API_MESSAGES.USUARIO_EXCLUIDO);

        deleteUserUseCase(userId).then((secondDelete) => {
          expect(secondDelete.status).to.equal(200);
          expect(secondDelete.body.message).to.equal(API_MESSAGES.NENHUM_REGISTRO_EXCLUIDO);
        });
      });
    });
  });
});
