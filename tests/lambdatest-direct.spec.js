const { test, expect } = require('@playwright/test');
const { chromium, firefox, webkit } = require('playwright');

/**
 * LambdaTest Test Examples using direct browser connection
 */

test.describe('LambdaTest Direct Connection Tests', () => {
  
  test('Chrome Browser Test on LambdaTest', async () => {
    const capabilities = {
      'browserName': 'Chrome',
      'browserVersion': 'latest',
      'LT:Options': {
        'platform': 'Windows 10',
        'build': 'Playwright-Pushpal-Build',
        'name': 'Chrome Direct Connect Test',
        'user': process.env.LT_USERNAME,
        'accessKey': process.env.LT_ACCESS_KEY,
        'network': true,
        'video': true,
        'console': true,
        'tunnel': false
      }
    };

    const browser = await chromium.connect({
      wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    });

    const page = await browser.newPage();
    
    try {
      // Navigate to test site
      await page.goto('https://ecommerce-playground.lambdatest.io/');
      
      // Verify page title
      await expect(page).toHaveTitle(/Your Store/);
      
      // Test search functionality
      await page.fill('input[name="search"]', 'iPhone');
      await page.click('button[type="submit"]');
      
      // Wait for search results
      await page.waitForSelector('.product-list');
      
      // Verify search results
      const searchResults = await page.locator('.product-item').count();
      expect(searchResults).toBeGreaterThan(0);
      
      console.log(`✅ Chrome test passed - Found ${searchResults} search results`);
      
    } finally {
      await browser.close();
    }
  });

  test('Firefox Browser Test on LambdaTest', async () => {
    const capabilities = {
      'browserName': 'pw-firefox',
      'browserVersion': 'latest',
      'LT:Options': {
        'platform': 'Windows 10',
        'build': 'Playwright-Pushpal-Build',
        'name': 'Firefox Direct Connect Test',
        'user': process.env.LT_USERNAME,
        'accessKey': process.env.LT_ACCESS_KEY,
        'network': true,
        'video': true,
        'console': true,
        'tunnel': false
      }
    };

    const browser = await firefox.connect({
      wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    });

    const page = await browser.newPage();
    
    try {
      // Navigate to test site
      await page.goto('https://ecommerce-playground.lambdatest.io/');
      
      // Test navigation
      await page.click('text=Components');
      await page.waitForSelector('.dropdown-menu');
      
      // Click on a component
      await page.click('text=Monitors');
      await page.waitForLoadState('networkidle');
      
      // Verify we're on monitors page
      await expect(page).toHaveURL(/category/);
      
      console.log('✅ Firefox test passed - Navigation successful');
      
    } finally {
      await browser.close();
    }
  });

  test('WebKit Browser Test on LambdaTest', async () => {
    const capabilities = {
      'browserName': 'pw-webkit',
      'browserVersion': 'latest',
      'LT:Options': {
        'platform': 'macOS Big Sur',
        'build': 'Playwright-Pushpal-Build',
        'name': 'WebKit Direct Connect Test',
        'user': process.env.LT_USERNAME,
        'accessKey': process.env.LT_ACCESS_KEY,
        'network': true,
        'video': true,
        'console': true,
        'tunnel': false
      }
    };

    const browser = await webkit.connect({
      wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    });

    const page = await browser.newPage();
    
    try {
      // Navigate to test site
      await page.goto('https://ecommerce-playground.lambdatest.io/');
      
      // Test form interaction
      await page.click('text=My account');
      await page.click('text=Register');
      
      // Fill registration form
      await page.fill('input[name="firstname"]', 'Test');
      await page.fill('input[name="lastname"]', 'User');
      await page.fill('input[name="email"]', 'test.user@example.com');
      await page.fill('input[name="telephone"]', '1234567890');
      
      // Verify form fields are filled
      const firstName = await page.inputValue('input[name="firstname"]');
      expect(firstName).toBe('Test');
      
      console.log('✅ WebKit test passed - Form interaction successful');
      
    } finally {
      await browser.close();
    }
  });

  test('Mobile Chrome Test on LambdaTest', async () => {
    const capabilities = {
      'browserName': 'Chrome',
      'browserVersion': 'latest',
      'LT:Options': {
        'platform': 'Android',
        'deviceName': 'Galaxy S21',
        'build': 'Playwright-Pushpal-Build',
        'name': 'Mobile Chrome Test',
        'user': process.env.LT_USERNAME,
        'accessKey': process.env.LT_ACCESS_KEY,
        'network': true,
        'video': true,
        'console': true,
        'tunnel': false,
        'isRealMobile': true
      }
    };

    const browser = await chromium.connect({
      wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    });

    const page = await browser.newPage();
    
    try {
      // Navigate to test site
      await page.goto('https://ecommerce-playground.lambdatest.io/');
      
      // Test mobile responsive design
      await page.click('[data-toggle="dropdown"]'); // Menu toggle
      await page.waitForSelector('.dropdown-menu', { state: 'visible' });
      
      // Verify mobile navigation
      const menuVisible = await page.isVisible('.dropdown-menu');
      expect(menuVisible).toBeTruthy();
      
      console.log('✅ Mobile Chrome test passed - Responsive navigation working');
      
    } finally {
      await browser.close();
    }
  });
});