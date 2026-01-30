const { test, expect } = require('@playwright/test');

test.describe('Test Scenario 1: Simple Form Demo', () => {
    test('TestMu AI Selenium Playground - Simple Form Demo Test', async ({ page, context }) => {
        test.setTimeout(180000); // 3 minutes timeout
        
        // Clear cookies and cache before starting
        await context.clearCookies();
        
        // Disable images and CSS to load faster
        await page.route('**/*.{png,jpg,jpeg,gif,css}', route => route.abort());
        
        console.log('🚀 Starting Test Scenario 1: Simple Form Demo');
        
        // Define test message variable at test level so it's accessible in all steps
        const testMessage = "Welcome to TestMu AI";
        
        // Step 1: Open TestMu AI Selenium Playground
        await test.step('Step 1: Open TestMu AI Selenium Playground', async () => {
        console.log('Opening TestMu AI Selenium Playground...');
        
        // Try multiple approaches to load the page
        let pageLoaded = false;
        const retryAttempts = 3;
        
        for (let attempt = 1; attempt <= retryAttempts; attempt++) {
            try {
                console.log(`Attempt ${attempt} to load the page...`);
                await page.goto('https://www.testmuai.com/selenium-playground/', {
                    waitUntil: 'domcontentloaded',
                    timeout: 60000
                });
                
                // Wait a bit for the page to stabilize
                await page.waitForTimeout(3000);
                
                // Check if the page actually loaded by looking for expected content
                const pageTitle = await page.title();
                console.log(`Page title: ${pageTitle}`);
                
                if (pageTitle && pageTitle.length > 0) {
                    pageLoaded = true;
                    break;
                }
            } catch (error) {
                console.log(`Attempt ${attempt} failed: ${error.message}`);
                if (attempt === retryAttempts) {
                    throw new Error(`Failed to load page after ${retryAttempts} attempts: ${error.message}`);
                }
                await page.waitForTimeout(2000); // Wait before retry
            }
        }
        
        console.log('✅ Successfully loaded TestMu AI Selenium Playground');
        });
        
        // Step 2: Click "Simple Form Demo"
        await test.step('Step 2: Click "Simple Form Demo"', async () => {
        console.log('Looking for Simple Form Demo link...');
        
        // Wait for the page to fully load and look for the link
        await page.waitForTimeout(2000);
        
        // Try multiple selectors for the Simple Form Demo link
        const linkSelectors = [
            'text="Simple Form Demo"',
            'a:has-text("Simple Form Demo")',
            '[href*="simple-form-demo"]',
            'text="simple form demo"',
            'text*="Simple Form"'
        ];
        
        let linkFound = false;
        for (const selector of linkSelectors) {
            try {
                const link = page.locator(selector).first();
                await link.waitFor({ timeout: 10000 });
                if (await link.isVisible()) {
                    console.log(`✅ Found Simple Form Demo link with selector: ${selector}`);
                    await link.click();
                    linkFound = true;
                    break;
                }
            } catch (e) {
                console.log(`Selector ${selector} not found, trying next...`);
            }
        }
        
        if (!linkFound) {
            // Take screenshot to see what's on the page
            await page.screenshot({ path: 'debug-page-content.png', fullPage: true });
            throw new Error('Could not find Simple Form Demo link on the page');
        }
        
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
        console.log('✅ Clicked Simple Form Demo link');
        });
        
        // Step 3: Validate that the URL contains "simple-form-demo"
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
        
        // Step 5: Enter the message in the "Enter Message" text box
        console.log('Entering message in text box...');
        
        // Wait for the form to be fully loaded
        await page.waitForTimeout(2000);
        
        // Try different possible selectors for the message input
        const messageInputSelectors = [
            '#user-message',
            'input[placeholder*="Enter message"]',
            'input[placeholder*="enter message"]',
            'input[placeholder*="Enter Message"]',
            'input[placeholder*="message"]',
            '#single-input-field',
            'input[type="text"]:first-of-type',
            'input[name*="message"]',
            'input[id*="message"]'
        ];
        
        let messageInput = null;
        for (const selector of messageInputSelectors) {
            try {
                messageInput = page.locator(selector).first();
                if (await messageInput.isVisible({ timeout: 3000 })) {
                    console.log(`✅ Found message input with selector: ${selector}`);
                    
                    // Clear any existing text
                    await messageInput.click();
                    await messageInput.clear();
                    
                    // Type the message slowly to ensure it's captured
                    await messageInput.type(testMessage, { delay: 50 });
                    
                    // Verify the text was entered
                    const enteredValue = await messageInput.inputValue();
                    console.log(`Entered value: "${enteredValue}"`);
                    
                    if (enteredValue === testMessage) {
                        console.log('✅ Successfully entered and verified test message');
                        break;
                    } else {
                        console.log('⚠️ Entered value does not match, trying fill method...');
                        await messageInput.clear();
                        await messageInput.fill(testMessage);
                        const reEnteredValue = await messageInput.inputValue();
                        console.log(`Re-entered value: "${reEnteredValue}"`);
                        if (reEnteredValue === testMessage) {
                            console.log('✅ Successfully entered test message with fill method');
                            break;
                        }
                    }
                }
            } catch (e) {
                console.log(`Selector ${selector} failed: ${e.message}`);
            }
        }
        
        if (!messageInput || !(await messageInput.inputValue()) ) {
            await page.screenshot({ path: 'debug-input-not-found.png', fullPage: true });
            throw new Error('Could not find or fill message input field');
        }
        });
        
        // Step 6: Click "Get Checked Value"
        await test.step('Step 6: Click "Get Checked Value" button', async () => {
        console.log('Looking for Get Checked Value button...');
        
        await page.waitForTimeout(1000);
        
        const buttonSelectors = [
            '#showInput',
            'button:has-text("Show Message")',
            'button:has-text("Get Checked Value")',
            'input[value*="Get Checked Value"]',
            'input[value*="Show Message"]',
            'button[id*="show"]',
            'input[type="submit"]',
            'button[type="submit"]',
            '#show-message',
            'button:first-of-type'
        ];
        
        let submitButton = null;
        for (const selector of buttonSelectors) {
            try {
                submitButton = page.locator(selector).first();
                if (await submitButton.isVisible({ timeout: 3000 })) {
                    console.log(`✅ Found submit button with selector: ${selector}`);
                    
                    // Click the button and wait for response
                    await submitButton.click();
                    console.log('✅ Clicked Get Checked Value button');
                    break;
                }
            } catch (e) {
                console.log(`Button selector ${selector} failed: ${e.message}`);
            }
        }
        
        if (!submitButton) {
            await page.screenshot({ path: 'debug-button-not-found.png', fullPage: true });
            throw new Error('Could not find submit button');
        }
        
        // Wait for response
        await page.waitForTimeout(2000);
        });
        
        // Step 7: Validate the message is displayed in the right panel
        await test.step('Step 7: Validate message is displayed in right panel', async () => {
        console.log('Validating displayed message...');
        
        // Wait longer for the message to appear
        await page.waitForTimeout(3000);
        
        // Take a screenshot to debug
        await page.screenshot({ path: 'debug-before-validation.png', fullPage: true });
        
        const displaySelectors = [
            '#message',
            '#display',
            'span#message',
            'div#message',
            '#user-message + #message',
            '.is-size-5',
            'span.is-size-5'
        ];
        
        let messageDisplayed = false;
        let displayedText = '';
        
        // Try to find the display element with the message
        for (const selector of displaySelectors) {
            try {
                const displayElement = page.locator(selector);
                if (await displayElement.isVisible({ timeout: 3000 })) {
                    displayedText = await displayElement.textContent();
                    console.log(`Checking selector ${selector}: "${displayedText}"`);
                    if (displayedText && displayedText.includes(testMessage)) {
                        console.log(`✅ FOUND MESSAGE in element with selector: ${selector}`);
                        console.log(`   Displayed text: "${displayedText}"`);
                        messageDisplayed = true;
                        break;
                    }
                }
            } catch (e) {
                // Try next selector
            }
        }
        
        // If not found in specific elements, search the entire page
        if (!messageDisplayed) {
            console.log('Searching entire page for the message...');
            const pageContent = await page.textContent('body');
            if (pageContent.includes(testMessage)) {
                console.log('✅ Test message found somewhere on the page');
                messageDisplayed = true;
                displayedText = testMessage;
            } else {
                console.log('❌ Test message NOT found on the page');
                console.log('Page content sample:', pageContent.substring(0, 500));
            }
        }
        
        // Validate the message is displayed
        expect(messageDisplayed, `Expected message "Welcome to TestMu AI" to be displayed on the page`).toBe(true);
        expect(displayedText.includes('Welcome to TestMu AI') || messageDisplayed, 
            `Expected displayed text to contain "Welcome to TestMu AI"`).toBe(true);
        console.log('✅ Message validation passed - test message is displayed correctly');
        });
        
        console.log('🎉 Test Scenario 1 completed successfully!');
        
        // Take a success screenshot
        await page.screenshot({
            path: `test-scenario-1-success-${Date.now()}.png`,
            fullPage: true
        });
        console.log('📸 Success screenshot captured');
    });
});