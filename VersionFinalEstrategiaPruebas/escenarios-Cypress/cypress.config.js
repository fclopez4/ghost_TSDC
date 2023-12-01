const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3001",
    env: {
      usuario: "a.clavijo1@uniandes.edu.co",
      password: "PIKA235chu",
      urlGhost500: "http://localhost:3002",
      urlGhost568: "http://localhost:3001",
    },
  },
  video: true,
  viewportWidth: 375,
  viewportHeight: 812,
});
