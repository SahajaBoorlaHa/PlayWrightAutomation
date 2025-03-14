// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const { on } = require('events');

module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  timeout: 50*1000,
  expect: {
    timeout: 5000
  },
  reporter: [
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName : 'chromium',
    headless : false,
    screenshot: 'on',
    trace: 'retain-on-failure'

    
  }

  
});


