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
    },
  },
  video: true,
});
