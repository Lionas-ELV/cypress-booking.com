const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  numTestsKeptInMemory: 1,
  watchForFileChanges: false,
  scrollBehavior: 'center',
  e2e: {
    baseUrl: 'https://www.booking.com',
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
