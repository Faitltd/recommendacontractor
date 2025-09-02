import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    supportFile: false,
    video: false,
    screenshotOnRunFailure: true,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
  }
});

