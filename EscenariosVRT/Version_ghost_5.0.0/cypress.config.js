const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3002",
    env: {
      usuario: "ing_andresalarcon@outlook.com",
      password: "@ndresRcw448",
    },
  },
});
