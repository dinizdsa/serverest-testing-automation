const createUserUseCase = require('../../../support/usecases/api/createUserUseCase');
const getUsersUseCase = require('../../../support/usecases/api/getUsersUseCase');
const DataGenerator = require('../../../support/utils/DataGenerator');

describe('GET /usuarios — List Users', () => {
    
  it('given no filters — when listing users — then returns 200 with correct structure', function () {
    createUserUseCase(DataGenerator.generateValidUser()).then((response) => {
      createdUser = response.body;
      getUsersUseCase().then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('quantidade');
        expect(response.body.quantidade).to.be.a('number').and.to.be.greaterThan(0);
        expect(response.body).to.have.property('usuarios').that.is.an('array');
        expect(response.body.usuarios).to.have.lengthOf(response.body.quantidade);
      });
    });
  });

  it('given no filters — when listing users — then the created user is present in the list', function () {
    createUserUseCase(DataGenerator.generateValidUser()).then((response) => {
      createdUser = response.body;
      getUsersUseCase().then((response) => {
        const matchedUser = response.body.usuarios.find(
          (user) => user._id === createdUser._id,
        );

        expect(matchedUser, 'User created in before must be in the list').to.not.be.undefined;
        expect(matchedUser).to.have.all.keys('_id', 'nome', 'email', 'password', 'administrador');
        expect(matchedUser.nome).to.equal(createdUser.nome);
        expect(matchedUser.email).to.equal(createdUser.email);
        expect(matchedUser.administrador).to.equal(createdUser.administrador);
      });
    });
  });
  
  it('given a valid nome filter — when listing users — then returns 200', function () {
    createUserUseCase(DataGenerator.generateValidUser()).then((response) => {
      createdUser = response.body;
      getUsersUseCase({ nome: createdUser.nome }).then((response) => {
      expect(response.status).to.equal(200);
        expect(response.body).to.have.property('quantidade');
        expect(response.body.quantidade).to.be.a('number').and.to.be.greaterThan(0);
        expect(response.body).to.have.property('usuarios').that.is.an('array');
        expect(response.body.usuarios).to.have.lengthOf(response.body.quantidade);
      });
    });
  });

  it('given a nome that does not exist — when listing users — then quantidade is 0', function () {
    const ghostName = `NonExistent_${Date.now()}`;
    
    getUsersUseCase({ nome: ghostName }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.quantidade).to.equal(0);
      expect(response.body.usuarios).to.be.empty;
    });
  });
  
  it('given a valid email filter — when listing users — then returns exactly 1 result', function () {
    createUserUseCase(DataGenerator.generateValidUser()).then((response) => {
      createdUser = response.body;
      getUsersUseCase({ email: createdUser.email }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.quantidade).to.equal(1);
        expect(response.body.usuarios[0].email).to.equal(createdUser.email);
      });
    });
  });
  
});
