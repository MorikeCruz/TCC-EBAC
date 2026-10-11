module.exports = {
  rootDir: '..',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/API/**/*.test.js'],
  setupFiles: ['<rootDir>/API/setupEnv.js'],
  testTimeout: 30000,
  reporters: [
    'default',
    ['jest-html-reporters', {
      publicPath: './reports/api',
      filename: 'relatorio-api.html',
      pageTitle: 'TCC EBAC QE - Testes de API (cupons)',
      expand: true,
    }],
  ],
};
