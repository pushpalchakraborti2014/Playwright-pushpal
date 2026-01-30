const { test, expect } = require('@playwright/test');

test.describe('TestMu AI - Simple Form Demo Tests (Fixed)', () => {
    test('Test Scenario 1: Simple Form Demo Validation', async ({ page }) => {
        // Increase timeouts for better stability
        test.setTimeout(120000);
        
        console.log('🚀 Starting Test Scenario 1: Simple Form Demo');
        
        try {
            // Step 1: Open TestMu AI Selenium Playground
            console.log('Step 1: Navigating to TestMu AI Selenium Playground...');
            await page.goto('https://www.testmu.ai/selenium-playground/', { 
                waitUntil: 'domcontentloaded',
                timeout: 60000 
            });
            console.log('✅ Page loaded successfully');

            // Wait for page to be ready
            await page.waitForTimeout(2000);

            // Step 2: Click "Simple Form Demo"
            console.log('Step 2: Looking for Simple Form Demo link...');
            
            // Look for the link with more flexible selectors
            const simpleFormLink = page.locator('text="Simple Form Demo"').first();
            await expect(simpleFormLink).toBeVisible({ timeout: 30000 });
            console.log('✅ Simple Form Demo link found');

            await simpleFormLink.click();
            await page.waitForLoadState('domcontentloaded');
            console.log('✅ Clicked Simple Form Demo link');

            // Step 3: Validate that the URL contains "simple-form-demo"
            console.log('Step 3: Validating URL...');
            await page.waitForTimeout(2000);
            const currentURL = page.url();
            console.log(`Current URL: ${currentURL}`);
            
            const urlContainsSimpleForm = currentURL.includes('simple-form-demo');
            expect(urlContainsSimpleForm, `URL should contain "simple-form-demo" but was: ${currentURL}`).toBeTruthy();
            console.log('✅ URL validation passed');

            // Step 4 & 5: Create variable and enter message
            console.log('Step 4-5: Entering test message...');
            const testMessage = "Welcome to TestMu AI";
            console.log(`Test message: "${testMessage}"`);

            // Find the message input field with various selectors
            const messageInput = page.locator('input[placeholder*="message" i], input[id*="message" i], input[name*="message" i]').first();
            await expect(messageInput).toBeVisible({ timeout: 30000 });
            
            await messageInput.clear();
            await messageInput.fill(testMessage);
            console.log('✅ Message entered successfully');

            // Step 6: Click "Get Checked Value"
            console.log('Step 6: Looking for Get Checked Value button...');
            const getValueButton = page.locator('button:has-text("Get Checked Value"), input[type="submit"][value*="Get"], button[value*="Get"]').first();
            await expect(getValueButton).toBeVisible({ timeout: 30000 });
            
            await getValueButton.click();
            await page.waitForTimeout(2000);
            console.log('✅ Clicked Get Checked Value button');

            // Step 7: Validate displayed message
            console.log('Step 7: Validating displayed message...');
            
            // Look for the display area with flexible selectors
            const displayArea = page.locator('#display-message, [id*="message" i], [id*="display" i], .message, .display').first();
            await page.waitForTimeout(3000); // Wait for message to appear
            
            const displayedText = await displayArea.textContent();
            console.log(`Displayed text: "${displayedText}"`);
            
            const messageDisplayed = displayedText && displayedText.includes(testMessage);
            expect(messageDisplayed, `Display should contain "${testMessage}" but was: "${displayedText}"`).toBeTruthy();
            console.log('✅ Message validation passed');

            console.log('🎉 Test Scenario 1 completed successfully!');

        } catch (error) {
            console.error(`❌ Test failed: ${error.message}`);
            
            // Take screenshot for debugging
            try {
                await page.screenshot({ 
                    path: `test-failure-${Date.now()}.png`,
                    fullPage: true 
                });
                console.log('📸 Screenshot saved for debugging');
            } catch (screenshotError) {
                console.log('⚠️ Could not take screenshot');
            }
            
            throw error;
        }
    });
});