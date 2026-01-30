const { chromium } = require('@playwright/test');
const { test, expect } = require('@playwright/test');

const LT_USERNAME = process.env.LT_USERNAME || 'pushpalchakraborti2014';
const LT_ACCESS_KEY = process.env.LT_ACCESS_KEY || 'LT_22KXi0gCk9yvDkZTFhf60N7mxt3jsXVOo7dRZhOqU2SylOt';

// Generate capabilities for LambdaTest
function getCapabilities(browserName, testName) {
    return {
        'browserName': browserName,
        'browserVersion': 'latest',
        'LT:Options': {
            'platform': 'Windows 10',
            'build': 'TestMu AI - Playwright Cloud Tests',
            'name': testName,
            'user': LT_USERNAME,
            'accessKey': LT_ACCESS_KEY,
            'network': true,
            'video': true,
            'console': true,
            'screenshot': true,
            'w3c': true,
            'plugin': 'node_js-playwright'
        }
    };
}

test.describe('Test Scenario 3: Input Form Submit - LambdaTest Cloud', () => {
    
    test('Run on Chrome - LambdaTest Cloud', async () => {
        const capabilities = getCapabilities('Chrome', 'Scenario 3 - Input Form Submit - Chrome');
        const wsEndpoint = `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`;
        
        const browser = await chromium.connect({
            wsEndpoint: wsEndpoint
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        
        try {
            test.setTimeout(180000);
            
            await test.step('Step 1: Open TestMu AI Selenium Playground and click "Input Form Submit"', async () => {
                console.log('🚀 Starting Test Scenario 3 on LambdaTest Cloud - Chrome');
                await page.goto('https://www.testmuai.com/selenium-playground/', {
                    waitUntil: 'domcontentloaded',
                    timeout: 60000
                });
                await page.waitForTimeout(3000);
                console.log('✅ Page loaded successfully');
                
                const inputFormLink = page.locator('text="Input Form Submit"').first();
                await inputFormLink.waitFor({ timeout: 30000, state: 'visible' });
                await page.waitForTimeout(1000);
                await inputFormLink.click({ timeout: 60000 });
                
                await page.waitForLoadState('domcontentloaded');
                await page.waitForTimeout(3000);
                
                const currentUrl = page.url();
                expect(currentUrl).toContain('input-form');
                console.log('✅ Successfully navigated to Input Form Submit page');
            });
            
            await test.step('Step 2: Click "Submit" without filling in any information', async () => {
                console.log('Clicking Submit button without filling form...');
                await page.waitForTimeout(2000);
                
                const submitButton = page.locator('button[type="submit"]:visible, button:has-text("Submit"):visible').first();
                await submitButton.waitFor({ timeout: 30000, state: 'visible' });
                await submitButton.click();
                
                await page.waitForTimeout(1000);
                console.log('✅ Clicked Submit button without filling form');
            });
            
            await test.step('Step 3: Assert "Please fill in this field." error message', async () => {
                console.log('Validating error message...');
                await page.waitForTimeout(2000);
                
                const firstRequiredField = page.locator('input[required]').first();
                const validationMessage = await firstRequiredField.evaluate((el) => el.validationMessage);
                console.log(`Validation message: "${validationMessage}"`);
                
                expect(validationMessage).toContain('fill');
                console.log('✅ Error message validation passed');
            });
            
            await test.step('Step 4-5: Fill in all form fields and select Country', async () => {
                console.log('Filling form fields...');
                await page.waitForTimeout(2000);
                
                await page.locator('input[name="name"]:visible').first().fill('John Doe');
                console.log('✅ Filled Name: John Doe');
                
                await page.locator('input[name="email"]:visible').first().fill('john.doe@testmuai.com');
                console.log('✅ Filled Email: john.doe@testmuai.com');
                
                await page.locator('input[name="password"]:visible').first().fill('Test@1234');
                console.log('✅ Filled Password');
                
                await page.locator('input[name="company"]:visible').first().fill('TestMu AI Inc');
                console.log('✅ Filled Company: TestMu AI Inc');
                
                const websiteField = page.locator('input[name="website"]:visible').first();
                const websiteCount = await websiteField.count();
                if (websiteCount > 0) {
                    await websiteField.fill('https://www.testmuai.com');
                    console.log('✅ Filled Website');
                }
                
                await page.locator('select[name="country"]:visible').first().selectOption('United States');
                console.log('✅ Selected Country: United States');
                
                await page.locator('input[name="city"]:visible').first().fill('New York');
                console.log('✅ Filled City: New York');
                
                await page.locator('#inputAddress1').first().fill('123 Test Street');
                console.log('✅ Filled Address1: 123 Test Street');
                
                await page.locator('#inputAddress2').first().fill('Apartment 4B');
                console.log('✅ Filled Address2: Apartment 4B');
                
                await page.locator('input[name="state"]:visible, input[placeholder*="State" i]:visible').first().fill('New York');
                console.log('✅ Filled State: New York');
                
                await page.locator('input[name="zip"]:visible, input[placeholder*="Zip" i]:visible').first().fill('10001');
                console.log('✅ Filled Zip Code: 10001');
            });
            
            await test.step('Step 6: Click "Submit" button', async () => {
                console.log('Clicking Submit button...');
                await page.waitForTimeout(1000);
                
                const submitButton = page.locator('button[type="submit"]:visible, button:has-text("Submit"):visible').first();
                await submitButton.waitFor({ timeout: 30000, state: 'visible' });
                await submitButton.click();
                
                await page.waitForTimeout(3000);
                console.log('✅ Clicked Submit button');
            });
            
            await test.step('Step 7: Validate success message', async () => {
                console.log('Validating success message...');
                await page.waitForTimeout(2000);
                
                const successMessage = page.locator('text=/Thanks for contacting us.*we will get back to you shortly/i');
                await successMessage.waitFor({ timeout: 15000 });
                
                const isVisible = await successMessage.isVisible();
                expect(isVisible).toBeTruthy();
                console.log('✅ Success message validated: "Thanks for contacting us, we will get back to you shortly."');
            });
            
        } finally {
            await page.close();
            await context.close();
            await browser.close();
        }
    });
    
    test('Run on Microsoft Edge - LambdaTest Cloud', async () => {
        test.setTimeout(240000); // Extended timeout for Edge
        
        const capabilities = getCapabilities('MicrosoftEdge', 'Scenario 3 - Input Form Submit - Edge');
        const wsEndpoint = `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`;
        
        // Retry connection logic for LambdaTest server errors
        let browser, context, page;
        let connectionAttempts = 3;
        let lastError;
        
        for (let attempt = 1; attempt <= connectionAttempts; attempt++) {
            try {
                console.log(`Edge connection attempt ${attempt}/${connectionAttempts}...`);
                browser = await chromium.connect({
                    wsEndpoint: wsEndpoint,
                    timeout: 90000
                });
                context = await browser.newContext();
                page = await context.newPage();
                console.log('✅ Edge browser connected successfully');
                break;
            } catch (error) {
                lastError = error;
                console.log(`❌ Connection attempt ${attempt} failed: ${error.message}`);
                if (attempt < connectionAttempts) {
                    const delay = attempt * 3000; // Increasing delay
                    console.log(`Waiting ${delay}ms before retry...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                } else {
                    throw new Error(`Failed to connect to Edge after ${connectionAttempts} attempts: ${lastError.message}`);
                }
            }
        }
        
        try {
            
            await test.step('Step 1: Open TestMu AI Selenium Playground and click "Input Form Submit"', async () => {
                console.log('🚀 Starting Test Scenario 3 on LambdaTest Cloud - Edge');
                await page.goto('https://www.testmuai.com/selenium-playground/', {
                    waitUntil: 'domcontentloaded',
                    timeout: 60000
                });
                await page.waitForTimeout(3000);
                console.log('✅ Page loaded successfully');
                
                const inputFormLink = page.locator('text="Input Form Submit"').first();
                await inputFormLink.waitFor({ timeout: 30000, state: 'visible' });
                await page.waitForTimeout(1000);
                await inputFormLink.click({ timeout: 60000 });
                
                await page.waitForLoadState('domcontentloaded');
                await page.waitForTimeout(3000);
                
                const currentUrl = page.url();
                expect(currentUrl).toContain('input-form');
                console.log('✅ Successfully navigated to Input Form Submit page');
            });
            
            await test.step('Step 2: Click "Submit" without filling in any information', async () => {
                console.log('Clicking Submit button without filling form...');
                await page.waitForTimeout(2000);
                
                const submitButton = page.locator('button[type="submit"]:visible, button:has-text("Submit"):visible').first();
                await submitButton.waitFor({ timeout: 30000, state: 'visible' });
                await submitButton.click();
                
                await page.waitForTimeout(1000);
                console.log('✅ Clicked Submit button without filling form');
            });
            
            await test.step('Step 3: Assert "Please fill in this field." error message', async () => {
                console.log('Validating error message...');
                await page.waitForTimeout(2000);
                
                const firstRequiredField = page.locator('input[required]').first();
                const validationMessage = await firstRequiredField.evaluate((el) => el.validationMessage);
                console.log(`Validation message: "${validationMessage}"`);
                
                expect(validationMessage).toContain('fill');
                console.log('✅ Error message validation passed');
            });
            
            await test.step('Step 4-5: Fill in all form fields and select Country', async () => {
                console.log('Filling form fields...');
                await page.waitForTimeout(2000);
                
                await page.locator('input[name="name"]:visible').first().fill('John Doe');
                console.log('✅ Filled Name: John Doe');
                
                await page.locator('input[name="email"]:visible').first().fill('john.doe@testmuai.com');
                console.log('✅ Filled Email: john.doe@testmuai.com');
                
                await page.locator('input[name="password"]:visible').first().fill('Test@1234');
                console.log('✅ Filled Password');
                
                await page.locator('input[name="company"]:visible').first().fill('TestMu AI Inc');
                console.log('✅ Filled Company: TestMu AI Inc');
                
                const websiteField = page.locator('input[name="website"]:visible').first();
                const websiteCount = await websiteField.count();
                if (websiteCount > 0) {
                    await websiteField.fill('https://www.testmuai.com');
                    console.log('✅ Filled Website');
                }
                
                await page.locator('select[name="country"]:visible').first().selectOption('United States');
                console.log('✅ Selected Country: United States');
                
                await page.locator('input[name="city"]:visible').first().fill('New York');
                console.log('✅ Filled City: New York');
                
                await page.locator('#inputAddress1').first().fill('123 Test Street');
                console.log('✅ Filled Address1: 123 Test Street');
                
                await page.locator('#inputAddress2').first().fill('Apartment 4B');
                console.log('✅ Filled Address2: Apartment 4B');
                
                await page.locator('input[name="state"]:visible, input[placeholder*="State" i]:visible').first().fill('New York');
                console.log('✅ Filled State: New York');
                
                await page.locator('input[name="zip"]:visible, input[placeholder*="Zip" i]:visible').first().fill('10001');
                console.log('✅ Filled Zip Code: 10001');
            });
            
            await test.step('Step 6: Click "Submit" button', async () => {
                console.log('Clicking Submit button...');
                await page.waitForTimeout(1000);
                
                const submitButton = page.locator('button[type="submit"]:visible, button:has-text("Submit"):visible').first();
                await submitButton.waitFor({ timeout: 30000, state: 'visible' });
                await submitButton.click();
                
                await page.waitForTimeout(3000);
                console.log('✅ Clicked Submit button');
            });
            
            await test.step('Step 7: Validate success message', async () => {
                console.log('Validating success message...');
                await page.waitForTimeout(2000);
                
                const successMessage = page.locator('text=/Thanks for contacting us.*we will get back to you shortly/i');
                await successMessage.waitFor({ timeout: 15000 });
                
                const isVisible = await successMessage.isVisible();
                expect(isVisible).toBeTruthy();
                console.log('✅ Success message validated: "Thanks for contacting us, we will get back to you shortly."');
            });
            
        } finally {
            await page.close();
            await context.close();
            await browser.close();
        }
    });
});
