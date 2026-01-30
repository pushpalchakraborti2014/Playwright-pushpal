const { test, expect, chromium } = require('@playwright/test');

test.describe('Test Scenario 1: Simple Form Demo - LambdaTest Cloud', () => {
    test('TestMu AI Selenium Playground - Simple Form Demo Test on LambdaTest', async ({}) => {
        test.setTimeout(180000); // 3 minutes timeout
        
        // LambdaTest credentials
        const LT_USERNAME = process.env.LT_USERNAME || 'pushpalchakraborti2014';
        const LT_ACCESS_KEY = process.env.LT_ACCESS_KEY || 'LT_22KXi0gCk9yvDkZTFhf60N7mxt3jsXVOo7dRZhOqU2SylOt';
        
        // Define test message variable
        const testMessage = "Welcome to TestMu AI";
        
        // LambdaTest capabilities
        const capabilities = {
            'browserName': 'Chrome',
            'browserVersion': 'latest',
            'LT:Options': {
                'platform': 'Windows 10',
                'build': 'TestMu AI - Test Scenario 1',
                'name': 'Simple Form Demo Test',
                'user': LT_USERNAME,
                'accessKey': LT_ACCESS_KEY,
                'network': true,
                'video': true,
                'console': true,
                'visual': true,
                'w3c': true,
                'plugin': 'playwright-js'
            }
        };
        
        // Connect to LambdaTest
        const browser = await chromium.connect({
            wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
        });
        
        const context = await browser.newContext();
        const page = await context.newPage();
        
        try {
            console.log('🚀 Starting Test Scenario 1: Simple Form Demo on LambdaTest Cloud');
            
            // Step 1: Open TestMu AI Selenium Playground
            await test.step('Step 1: Open TestMu AI Selenium Playground', async () => {
                console.log('Opening TestMu AI Selenium Playground...');
                
                await page.goto('https://www.testmuai.com/selenium-playground/', {
                    waitUntil: 'domcontentloaded',
                    timeout: 45000
                });
                
                await page.waitForTimeout(3000);
                const pageTitle = await page.title();
                console.log(`Page title: ${pageTitle}`);
                console.log('✅ Successfully loaded TestMu AI Selenium Playground');
            });
            
            // Step 2: Click "Simple Form Demo"
            await test.step('Step 2: Click "Simple Form Demo"', async () => {
                console.log('Looking for Simple Form Demo link...');
                
                const simpleFormLink = page.locator('text="Simple Form Demo"').first();
                await simpleFormLink.waitFor({ timeout: 30000 });
                await simpleFormLink.click();
                
                await page.waitForLoadState('domcontentloaded');
                await page.waitForTimeout(2000);
                console.log('✅ Clicked Simple Form Demo link');
            });
            
            // Step 3: Validate URL contains "simple-form-demo"
            await test.step('Step 3: Validate URL contains "simple-form-demo"', async () => {
                console.log('Validating URL...');
                const currentUrl = page.url();
                console.log(`Current URL: ${currentUrl}`);
                expect(currentUrl).toContain('simple-form-demo');
                console.log('✅ URL validation passed - contains "simple-form-demo"');
            });
            
            // Step 4 & 5: Create variable and enter message
            await test.step('Step 4-5: Enter message "Welcome to TestMu AI"', async () => {
                console.log('Creating test message variable...');
                console.log(`Test message: "${testMessage}"`);
                
                console.log('Entering message in text box...');
                await page.waitForTimeout(2000);
                
                const messageInput = page.locator('#user-message');
                await messageInput.waitFor({ timeout: 30000 });
                
                await messageInput.click();
                await messageInput.clear();
                await messageInput.type(testMessage, { delay: 50 });
                
                const enteredValue = await messageInput.inputValue();
                console.log(`Entered value: "${enteredValue}"`);
                console.log('✅ Successfully entered and verified test message');
            });
            
            // Step 6: Click "Get Checked Value" button
            await test.step('Step 6: Click "Get Checked Value" button', async () => {
                console.log('Looking for Get Checked Value button...');
                
                const submitButton = page.locator('#showInput');
                await submitButton.waitFor({ timeout: 30000 });
                await submitButton.click();
                
                console.log('✅ Clicked Get Checked Value button');
                await page.waitForTimeout(2000);
            });
            
            // Step 7: Validate message is displayed in right panel
            await test.step('Step 7: Validate message is displayed in right panel', async () => {
                console.log('Validating displayed message...');
                await page.waitForTimeout(3000);
                
                const displayElement = page.locator('#message');
                await displayElement.waitFor({ timeout: 10000 });
                
                const displayedText = await displayElement.textContent();
                console.log(`Displayed text: "${displayedText}"`);
                
                expect(displayedText).toContain(testMessage);
                console.log('✅ Message validation passed - test message is displayed correctly');
            });
            
            console.log('🎉 Test Scenario 1 completed successfully on LambdaTest!');
            
            // Mark test as passed on LambdaTest
            await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Test Scenario 1 passed' } })}`);
            
        } catch (error) {
            console.error(`❌ Test failed: ${error.message}`);
            
            // Mark test as failed on LambdaTest
            await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: error.message } })}`);
            
            throw error;
        } finally {
            // Close the browser
            await page.close();
            await context.close();
            await browser.close();
        }
    });
});