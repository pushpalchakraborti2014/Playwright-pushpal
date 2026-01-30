const { chromium } = require('playwright');

(async () => {
  const capability = {
    "browserName": "Chrome",
    "browserVersion": "144.0",
    "LT:Options": {
      "video": true,
      "platform": "Windows 10",
      "network": true,
      "build": "playwright-pushpal",
      "name": "Test1",
      "tunnel": false,
      "console": true,
      "user": process.env.LT_USERNAME || "pushpalchakraborti2014",
      "accessKey": process.env.LT_ACCESS_KEY || "LT_22KXi0gCk9yvDkZTFhf60N7mxt3jsXVOo7dRZhOqU2SylOt"
    }
  };

  try {
    console.log('🚀 Starting LambdaTest Chrome 144.0 test...');
    console.log('📊 Capability:', JSON.stringify(capability, null, 2));

    const browser = await chromium.connect({
      wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capability))}`
    });

    console.log('✅ Connected to LambdaTest Chrome browser');

    const page = await browser.newPage();
    
    // Navigate to a test website
    console.log('🌐 Navigating to Playwright.dev...');
    await page.goto('https://playwright.dev/');
    
    // Verify page loaded
    const title = await page.title();
    console.log(`📄 Page Title: ${title}`);
    
    // Take a screenshot
    await page.screenshot({ path: 'screenshots/lambdatest-test1.png', fullPage: true });
    console.log('📸 Screenshot saved: screenshots/lambdatest-test1.png');
    
    // Perform some interactions
    console.log('🔍 Testing page interactions...');
    await page.getByRole('link', { name: 'Get started' }).click();
    await page.waitForLoadState('networkidle');
    
    const newUrl = page.url();
    console.log(`🔗 Navigated to: ${newUrl}`);
    
    // Check if docs page loaded
    const docsTitle = await page.title();
    console.log(`📚 Docs Page Title: ${docsTitle}`);
    
    // Get page content
    const heading = await page.locator('h1').first().textContent();
    console.log(`📝 Main Heading: ${heading}`);
    
    console.log('✅ Test completed successfully!');
    console.log('🎥 Video recording will be available in LambdaTest dashboard');
    console.log('🌐 Network logs captured for debugging');
    
    await browser.close();
    console.log('🔒 Browser session closed');

  } catch (error) {
    console.error('❌ Error during test execution:', error.message);
    process.exit(1);
  }
})();