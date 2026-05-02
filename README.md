# ServeRest Testing Automation

Projeto de automação de testes para validação da **API** e do **Frontend** do [ServeRest](https://serverest.dev).

## Sobre o ServeRest

O ServeRest é uma API REST gratuita que simula uma loja virtual com intuito de servir de material de estudos de testes de API.

- **API**: [serverest.dev](https://serverest.dev)
- **Frontend** (beta): [front.serverest.dev](https://front.serverest.dev)
- **Repositório**: [github.com/ServeRest/ServeRest](https://github.com/ServeRest/ServeRest)

## Estrutura do Projeto

```
cypress/
├── e2e/
│   ├── api/                        # Testes de API
│   │   └── usuarios/
│   │       ├── GET_usuarios.cy.js
│   │       ├── POST_usuarios.cy.js
│   │       └── DELETE_usuarios.cy.js
│   └── frontend/                   # Testes de Frontend
│       ├── usuarios/
│       │   ├── create-user.cy.js
│       │   └── create-user-from-admin-home.cy.js
│       └── products/
│           └── list-products-from-admin-home.cy.js
└── support/
    ├── api/
    │   └── apiClient.js            # Adapter HTTP (cy.request)
    ├── usecases/api/               # Casos de uso (camada de aplicação)
    │   ├── createUserUseCase.js
    │   ├── getUsersUseCase.js
    │   └── deleteUserUseCase.js
    ├── constants/
    │   └── apiMessages.js          # Mensagens esperadas da API
    ├── utils/
    │   └── DataGenerator.js        # Gerador de dados com Faker
    └── commands.js                 # Comandos customizados do Cypress
```

## Pré-requisitos

- **Node.js** >= 18
- **npm** >= 9

## Instalação (sem Docker)

```bash
git clone git@github.com:dinizdsa/serverest-testing-automation.git
cd serverest-testing-automation
npm install
```

### Executar testes de API

```bash
# Modo headless (terminal)
npm run test:api

# Modo interativo (Cypress UI)
npm run test:api:open
```

### Executar testes de Frontend

```bash
# Modo headless (terminal)
npm run test:frontend

# Modo interativo (Cypress UI)
npm run test:frontend:open
```

### Executar todos os testes

```bash
# Modo headless (terminal)
npm run cy:run

# Modo interativo (Cypress UI)
npm run cy:open
```

## Execução com Docker

Com Docker não é necessário instalar Node.js, npm ou Cypress na sua máquina.

### Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) >= 20
- [Docker Compose](https://docs.docker.com/compose/install/) >= 2

### Executar testes de API

```bash
docker compose run --rm test-api
```

### Executar testes de Frontend

```bash
docker compose run --rm test-frontend
```

### Executar todos os testes

```bash
docker compose run --rm test-all
```

### Artefatos

Após a execução, vídeos e screenshots ficam disponíveis nas pastas locais:

- `cypress/videos/`
- `cypress/screenshots/`

### Author
- David Diniz