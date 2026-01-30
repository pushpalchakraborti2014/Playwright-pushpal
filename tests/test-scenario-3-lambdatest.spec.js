const { chromium } = require('@playwright/test');
const { test, expect } = require('@playwright/test');

const LT_USERNAME = process.env.LT_USERNAME || 'pushpalchakraborti2014';
const LT_ACCESS_KEY = process.env.LT_ACCESS_KEY || 'LT_22KXi0gCk9yvDkZTFhf60N7mxt3jsXVOo7dRZhOqU2SylOt';

function getCapabilities(browserName, testName) {
    return {
        'browserName': browserName,
        'browserVersion': 'latest',
        'LT:Options': {
            'platform': 'Windows 10',
            'build': 'TestMu AI - Scenario 3 - LambdaTest',
            'name': testName,
            'user': LT_USERNAME,
            'accessKey': LT_ACCESS_KEY,
            'network': true,
            'video': true,
            'console': true,
            'screenshot': true,
            'w3c': true
        }
    };
}

test.describe('Test Scenario 3: Input Form Submit - LambdaTest', () => {
    
    test('Run on Chrome - LambdaTest', async () => {
        const capabilities = getCapabilities('Chrome', 'Scenario 3 - Input Form Submit - Chrome');
        const wsEndpoint = `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`;
        
        const browser = await chromium.connect(wsEndpoint);
        const context = await browser.newContext();
        const page = await context.newPage();
        
        try {
            test.setTimeout(180000);
            
            console.log('🚀 Starting Test Scenario 3 on LambdaTest Cloud');
            await page.goto('https://www.testmuai.com/selenium-playground/', { waitUntil: 'domcontentloaded', timeout: 60000 });
            await page.waitForTimeout(3000);
            
            const inputFormLink = page.locator('text="Input Form Submit"').first();
            await inputFormLink.click({ timeout: 60000 });
            await page.waitForTimeout(3000);
            
            // Click submit without filling
            const submitButton = page.locator('button:visible:has-text("Submit")').first();
            await submitButton.click();
            await page.waitForTimeout(2000);
            
            // Fill all form fields
            await page.locator('input[name="name"]:visible').first().fill('John Doe');
            await page.locator('input[name="email"]:visible').first().fill('john.doe@testmuai.com');
            await page.locator('input[name="password"]:visible').first().fill('Test@1234');
            await page.locator('input[name="company"]:visible').first().fill('TestMu AI Inc');
            await page.locator('input[name="website"]:visible').first().fill('https://www.testmuai.com');
            await page.locator('select[name="country"]:visible').first().selectOption('United States');
            await page.locator('input[name="city"]:visible').first().fill('New York');
            await page.locator('#inputAddress1').first().fill('123 Main Street');
            await page.locator('#inputAddress2').first().fill('Apartment 456');
            await page.locator('input[name="state"]:visible').first().fill('New York');
            await page.locator('input[name="zip"]:visible').first().fill('10001');
            
            console.log('✅ All form fields filled');
            
            // Submit form
            await submitButton.click();
            await page.waitForTimeout(3000);
            
            // Validate success message
            const successMsg = page.locator('.success-msg');
            await expect(successMsg).toContainText('Thanks for contacting us');
            console.log('✅ Success message validated');
            
            console.log('🎉 Test Scenario 3 completed successfully!');
        } finally {
            await page.close();
            await context.close();
            await browser.close();
        }
    });
    
    test('Run on Firefox - LambdaTest', async () => {
        const capabilities = getCapabilities('pw-firefox', 'Scenario 3 - Input Form Submit - Firefox');
        const wsEndpoint = `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`;
        
        const browser = await chromium.connect(wsEndpoint);
        const context = await browser.newContext();
        const page = await context.newPage();
        
        try {
            test.setTimeout(180000);
            
            console.log('🚀 Starting Test Scenario 3 on LambdaTest Cloud (Firefox)');
            await page.goto('https://www.testmuai.com/selenium-playground/', { waitUntil: 'domcontentloaded', timeout: 60000 });
            await page.waitForTimeout(3000);
            
            const inputFormLink = page.locator('text="Input Form Submit"').first();
            await inputFormLink.click({ timeout: 60000 });
            await page.waitForTimeout(3000);
            
            // Click submit without filling
            const submitButton = page.locator('button:visible:has-text("Submit")').first();
            await submitButton.click();
            await page.waitForTimeout(2000);
            
            // Fill all form fields
            await page.locator('input[name="name"]:visible').first().fill('John Doe');
            await page.locator('input[name="email"]:visible').first().fill('john.doe@testmuai.com');
            await page.locator('input[name="password"]:visible').first().fill('Test@1234');
            await page.locator('input[name="company"]:visible').first().fill('TestMu AI Inc');
            await page.locator('input[name="website"]:visible').first().fill('https://www.testmuai.com');
            await page.locator('select[name="country"]:visible').first().selectOption('United States');
            await page.locator('input[name="city"]:visible').first().fill('New York');
            await page.locator('#inputAddress1').first().fill('123 Main Street');
            await page.locator('#inputAddress2').first().fill('Apartment 456');
            await page.locator('input[name="state"]:visible').first().fill('New York');
            await page.locator('input[name="zip"]:visible').first().fill('10001');
            
            console.log('✅ All form fields filled');
            
            // Submit form
            await submitButton.click();
            await page.waitForTimeout(3000);
            
            // Validate success message
            const successMsg = page.locator('.success-msg');
            await expect(successMsg).toContainText('Thanks for contacting us');
            console.log('✅ Success message validated');
            
            console.log('🎉 Test Scenario 3 completed successfully!');
        } finally {
            await page.close();
            await context.close();
            await browser.close();
        }
    });
});
