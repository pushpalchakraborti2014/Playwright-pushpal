const { chromium, firefox } = require('@playwright/test');
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

test.describe('Test Scenario 1: Simple Form Demo - LambdaTest Cloud', () => {
    
    test('Run on Chrome - LambdaTest Cloud', async () => {
        const capabilities = getCapabilities('Chrome', 'Scenario 1 - Simple Form Demo - Chrome');
        const wsEndpoint = `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`;
        
        const browser = await chromium.connect(wsEndpoint);
        const context = await browser.newContext();
        const page = await context.newPage();
        
        try {
            test.setTimeout(180000);
            
            await test.step('Step 1: Open TestMu AI Selenium Playground', async () => {
                console.log('🚀 Starting Test Scenario 1 on LambdaTest Cloud');
                await page.goto('https://www.testmuai.com/selenium-playground/', {
                    waitUntil: 'domcontentloaded',
                    timeout: 60000
                });
                await page.waitForTimeout(3000);
                console.log('✅ Page loaded successfully');
            });
            
            await test.step('Step 2: Click Simple Form Demo', async () => {
                const simpleFormLink = page.locator('text="Simple Form Demo"').first();
                await simpleFormLink.click();
                await page.waitForTimeout(2000);
                
                const currentUrl = page.url();
                expect(currentUrl).toContain('simple-form-demo');
                console.log('✅ Navigated to Simple Form Demo');
            });
            
            await test.step('Step 3: Enter message', async () => {
                const testMessage = "Welcome to TestMu AI - Cloud Test";
                const messageInput = page.locator('#user-message');
                await messageInput.fill(testMessage);
                console.log(`✅ Entered message: ${testMessage}`);
            });
            
            await test.step('Step 4: Click Get Checked Value button', async () => {
                const submitButton = page.locator('#showInput');
                await submitButton.click();
                await page.waitForTimeout(2000);
                console.log('✅ Clicked button');
            });
            
            await test.step('Step 5: Validate message displayed', async () => {
                const displayMessage = page.locator('#message');
                await expect(displayMessage).toHaveText('Welcome to TestMu AI - Cloud Test');
                console.log('✅ Message validation passed');
            });
            
            console.log('🎉 Test Scenario 1 completed successfully on LambdaTest Cloud!');
            
        } finally {
            await page.close();
            await context.close();
            await browser.close();
        }
    });
    
    test('Run on Firefox - LambdaTest Cloud', async () => {
        const capabilities = getCapabilities('pw-firefox', 'Scenario 1 - Simple Form Demo - Firefox');
        const wsEndpoint = `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`;
        
        const browser = await chromium.connect(wsEndpoint);
        const context = await browser.newContext();
        const page = await context.newPage();
        
        try {
            test.setTimeout(180000);
            
            await test.step('Step 1: Open TestMu AI Selenium Playground', async () => {
                console.log('🚀 Starting Test Scenario 1 on LambdaTest Cloud (Firefox)');
                await page.goto('https://www.testmuai.com/selenium-playground/', {
                    waitUntil: 'domcontentloaded',
                    timeout: 60000
                });
                await page.waitForTimeout(3000);
                console.log('✅ Page loaded successfully');
            });
            
            await test.step('Step 2: Click Simple Form Demo', async () => {
                const simpleFormLink = page.locator('text="Simple Form Demo"').first();
                await simpleFormLink.click();
                await page.waitForTimeout(2000);
                
                const currentUrl = page.url();
                expect(currentUrl).toContain('simple-form-demo');
                console.log('✅ Navigated to Simple Form Demo');
            });
            
            await test.step('Step 3: Enter message', async () => {
                const testMessage = "Welcome to TestMu AI - Cloud Test";
                const messageInput = page.locator('#user-message');
                await messageInput.fill(testMessage);
                console.log(`✅ Entered message: ${testMessage}`);
            });
            
            await test.step('Step 4: Click Get Checked Value button', async () => {
                const submitButton = page.locator('#showInput');
                await submitButton.click();
                await page.waitForTimeout(2000);
                console.log('✅ Clicked button');
            });
            
            await test.step('Step 5: Validate message displayed', async () => {
                const displayMessage = page.locator('#message');
                await expect(displayMessage).toHaveText('Welcome to TestMu AI - Cloud Test');
                console.log('✅ Message validation passed');
            });
            
            console.log('🎉 Test Scenario 1 completed successfully on LambdaTest Cloud!');
            
        } finally {
            await page.close();
            await context.close();
            await browser.close();
        }
    });
});
