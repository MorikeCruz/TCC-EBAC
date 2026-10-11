const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || 'http://lojaebac.ebaconline.art.br',
    specPattern: 'UI/cypress/e2e/**/*.cy.js',
    supportFile: 'UI/cypress/support/e2e.js',
    fixturesFolder: 'UI/cypress/fixtures',
    video: false,
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 10000,
    retries: { runMode: 1, openMode: 0 },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'reports/ui',
      charts: true,
      reportPageTitle: 'TCC EBAC QE - Testes de UI',
      embeddedScreenshots: true,
      inlineAssets: true,
    },
    setupNodeEvents(on) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
