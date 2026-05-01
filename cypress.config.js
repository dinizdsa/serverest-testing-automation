const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {},

    specPattern: "cypress/e2e/**/*.cy.js",
    viewportWidth: 1280,
    viewportHeight: 720,

    retries: {
      runMode: 1, // retry once in CI to reduce flakiness
      openMode: 0,
    },

    video: true,
    screenshotOnRunFailure: true,

    env: {
      baseURLApi: "https://serverest.dev",
      baseURLFrontend: "https://front.serverest.dev",
    },
  },
});
