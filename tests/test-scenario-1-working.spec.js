const { test, expect } = require('@playwright/test');

test.describe('Test Scenario 1: Simple Form Demo - Alternative Implementation', () => {
    test('LambdaTest Playground - Simple Form Demo', async ({ page }) => {
        console.log('🚀 Starting Test Scenario 1 with LambdaTest Playground');
        
        try {
            // Step 1: Open LambdaTest Selenium Playground (similar to TestMu AI)
            console.log('Step 1: Navigating to LambdaTest Selenium Playground...');
            await page.goto('https://www.lambdatest.com/selenium-playground/', { 
                waitUntil: 'domcontentloaded',
                timeout: 60000 
            });
            console.log('✅ Page loaded successfully');
            await page.waitForTimeout(3000);

            // Step 2: Click "Simple Form Demo"
            console.log('Step 2: Looking for Simple Form Demo link...');
            const simpleFormLink = page.locator('text="Simple Form Demo"').first();
            await expect(simpleFormLink).toBeVisible({ timeout: 30000 });
            console.log('✅ Simple Form Demo link found');

            await simpleFormLink.click();
            await page.waitForLoadState('domcontentloaded');
            await page.waitForTimeout(2000);
            console.log('✅ Clicked Simple Form Demo link');

            // Step 3: Validate that the URL contains "simple-form-demo"
            console.log('Step 3: Validating URL...');
            const currentURL = page.url();
            console.log(`Current URL: ${currentURL}`);
            
            const urlContainsSimpleForm = currentURL.includes('simple-form-demo');
            expect(urlContainsSimpleForm, `URL should contain "simple-form-demo" but was: ${currentURL}`).toBeTruthy();
            console.log('✅ URL validation passed');

            // Step 4 & 5: Create variable and enter message
            console.log('Step 4-5: Entering test message...');
            const testMessage = "Welcome to TestMu AI";
            console.log(`Test message: "${testMessage}"`);

            // Find the message input field - LambdaTest specific selector
            const messageInput = page.locator('#user-message');
            await expect(messageInput).toBeVisible({ timeout: 30000 });
            
            await messageInput.clear();
            await messageInput.fill(testMessage);
            console.log('✅ Message entered successfully');

            // Step 6: Click "Get Checked Value"
            console.log('Step 6: Looking for Get Checked Value button...');
            const getValueButton = page.locator('#showInput');
            await expect(getValueButton).toBeVisible({ timeout: 30000 });
            
            await getValueButton.click();
            await page.waitForTimeout(2000);
            console.log('✅ Clicked Get Checked Value button');

            // Step 7: Validate displayed message
            console.log('Step 7: Validating displayed message...');
            
            // LambdaTest specific display area selector
            const displayArea = page.locator('#message');
            await page.waitForTimeout(3000); // Wait for message to appear
            
            const displayedText = await displayArea.textContent();
            console.log(`Displayed text: "${displayedText}"`);
            
            const messageDisplayed = displayedText && displayedText.includes(testMessage);
            expect(messageDisplayed, `Display should contain "${testMessage}" but was: "${displayedText}"`).toBeTruthy();
            console.log('✅ Message validation passed');

            console.log('🎉 Test Scenario 1 completed successfully!');

            // Take success screenshot
            await page.screenshot({ 
                path: `test-success-${Date.now()}.png`,
                fullPage: true 
            });

        } catch (error) {
            console.error(`❌ Test failed: ${error.message}`);
            
            // Take screenshot for debugging
            try {
                await page.screenshot({ 
                    path: `test-failure-${Date.now()}.png`,
                    fullPage: true 
                });
                console.log('📸 Failure screenshot saved for debugging');
            } catch (screenshotError) {
                console.log('⚠️ Could not take screenshot');
            }
            
            throw error;
        }
    });
});