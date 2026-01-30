// @ts-check
const { defineConfig } = require('@playwright/test');

/**
 * Playwright configuration for LambdaTest Cloud tests
 * This config has NO projects defined because cloud tests manage their own browser connections
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Configure workers for parallel execution */
  workers: 2, // Run 2 tests in parallel (Chrome and Firefox)
  
  /* Reporter to use */
  reporter: [
    ['html', { outputFolder: 'playwright-report-lambdatest' }],
    ['list'],
    ['json', { outputFile: 'test-results/lambdatest-results.json' }]
  ],
  
  /* Shared settings */
  use: {
    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',
    
    /* Take screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Record video on failure */
    video: 'retain-on-failure',
    
    /* Global timeout for actions */
    actionTimeout: 30000,
    
    /* Global timeout for navigation */
    navigationTimeout: 60000,
    
    /* Ignore HTTPS errors */
    ignoreHTTPSErrors: true,
  },
  
  /* NO PROJECTS - Cloud tests handle their own browser connections via WebSocket */
  projects: undefined,
  
  /* Folder for test artifacts */
  outputDir: 'test-results-lambdatest/',
  
  /* Timeout for each test */
  timeout: 180000, // 3 minutes per test
});
