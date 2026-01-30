const { chromium, firefox, webkit } = require('playwright');

/**
 * LambdaTest Direct Connection Example
 * This example shows how to connect directly to LambdaTest using browser.connect()
 */

(async () => {
  // Chrome capabilities
  const chromeCapabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Playwright Sample Build',
      'name': 'Playwright Sample Test - Chrome',
      'user': process.env.LT_USERNAME,
      'accessKey': process.env.LT_ACCESS_KEY,
      'network': true,
      'video': true,
      'console': true,
      'tunnel': false,
      'tunnelName': '',
      'geoLocation': 'US'
    }
  };

  // Firefox capabilities
  const firefoxCapabilities = {
    'browserName': 'pw-firefox',
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Playwright Sample Build',
      'name': 'Playwright Sample Test - Firefox',
      'user': process.env.LT_USERNAME,
      'accessKey': process.env.LT_ACCESS_KEY,
      'network': true,
      'video': true,
      'console': true,
      'tunnel': false,
      'tunnelName': '',
      'geoLocation': 'US'
    }
  };

  // WebKit capabilities
  const webkitCapabilities = {
    'browserName': 'pw-webkit',
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'macOS Big Sur',
      'build': 'Playwright Sample Build',
      'name': 'Playwright Sample Test - WebKit',
      'user': process.env.LT_USERNAME,
      'accessKey': process.env.LT_ACCESS_KEY,
      'network': true,
      'video': true,
      'console': true,
      'tunnel': false,
      'tunnelName': '',
      'geoLocation': 'US'
    }
  };

  try {
    console.log('🚀 Starting LambdaTest browser connections...');

    // Connect to Chrome browser
    console.log('📱 Connecting to Chrome...');
    const chromeBrowser = await chromium.connect({
      wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(chromeCapabilities))}`
    });

    // Create a new page in Chrome
    const chromePage = await chromeBrowser.newPage();
    
    // Navigate to a test website
    console.log('🌐 Navigating to Playwright.dev...');
    await chromePage.goto('https://playwright.dev/');
    
    // Take a screenshot
    await chromePage.screenshot({ path: 'screenshots/lambdatest-chrome.png', fullPage: true });
    
    // Verify page title
    const chromeTitle = await chromePage.title();
    console.log(`✅ Chrome Page Title: ${chromeTitle}`);
    
    // Perform some interactions
    await chromePage.getByRole('link', { name: 'Get started' }).click();
    await chromePage.waitForLoadState('networkidle');
    
    console.log('✅ Chrome test completed successfully');
    await chromeBrowser.close();

    // Connect to Firefox browser
    console.log('📱 Connecting to Firefox...');
    const firefoxBrowser = await firefox.connect({
      wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(firefoxCapabilities))}`
    });

    const firefoxPage = await firefoxBrowser.newPage();
    await firefoxPage.goto('https://playwright.dev/');
    
    const firefoxTitle = await firefoxPage.title();
    console.log(`✅ Firefox Page Title: ${firefoxTitle}`);
    
    await firefoxPage.screenshot({ path: 'screenshots/lambdatest-firefox.png', fullPage: true });
    console.log('✅ Firefox test completed successfully');
    await firefoxBrowser.close();

    // Connect to WebKit browser
    console.log('📱 Connecting to WebKit...');
    const webkitBrowser = await webkit.connect({
      wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(webkitCapabilities))}`
    });

    const webkitPage = await webkitBrowser.newPage();
    await webkitPage.goto('https://playwright.dev/');
    
    const webkitTitle = await webkitPage.title();
    console.log(`✅ WebKit Page Title: ${webkitTitle}`);
    
    await webkitPage.screenshot({ path: 'screenshots/lambdatest-webkit.png', fullPage: true });
    console.log('✅ WebKit test completed successfully');
    await webkitBrowser.close();

    console.log('🎉 All LambdaTest browser tests completed successfully!');

  } catch (error) {
    console.error('❌ Error during LambdaTest execution:', error);
    process.exit(1);
  }
})();

/**
 * Helper function to create LambdaTest capabilities
 * @param {string} browserName - Browser name (Chrome, pw-firefox, pw-webkit, MicrosoftEdge)
 * @param {string} platform - Platform (Windows 10, macOS Big Sur, etc.)
 * @param {string} testName - Test name for identification
 * @returns {Object} LambdaTest capabilities object
 */
function createLTCapabilities(browserName, platform, testName) {
  return {
    'browserName': browserName,
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': platform,
      'build': process.env.LT_BUILD_NAME || 'Playwright-Pushpal-Build',
      'name': testName,
      'user': process.env.LT_USERNAME,
      'accessKey': process.env.LT_ACCESS_KEY,
      'network': true,
      'video': true,
      'console': true,
      'tunnel': false,
      'tunnelName': '',
      'geoLocation': 'US',
      'resolution': '1920x1080',
      'selenium_version': '4.0.0'
    }
  };
}

/**
 * Helper function to connect to LambdaTest browser
 * @param {Object} browserType - Playwright browser type (chromium, firefox, webkit)
 * @param {Object} capabilities - LambdaTest capabilities
 * @returns {Promise<Browser>} Connected browser instance
 */
async function connectToLambdaTest(browserType, capabilities) {
  const wsEndpoint = `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`;
  return await browserType.connect({ wsEndpoint });
}

module.exports = {
  createLTCapabilities,
  connectToLambdaTest
};