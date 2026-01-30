const { test, expect } = require('@playwright/test');

test.describe('Test Scenario 3: Input Form Submit', () => {
    
    test('Fill and submit input form with validation', async ({ page, context }) => {
        test.setTimeout(180000);
        
        // Clear cookies/cache
        await context.clearCookies();
        
        // Step 1: Open TestMu AI Selenium Playground and click "Input Form Submit"
        await test.step('Step 1: Open TestMu AI Selenium Playground and click "Input Form Submit"', async () => {
            console.log('🚀 Starting Test Scenario 3: Input Form Submit');
            console.log('Opening TestMu AI Selenium Playground...');
            
            // Retry logic for network issues
            let retries = 3;
            let success = false;
            while (retries > 0 && !success) {
                try {
                    await page.goto('https://www.testmuai.com/selenium-playground/', {
                        waitUntil: 'domcontentloaded',
                        timeout: 60000
                    });
                    success = true;
                } catch (error) {
                    retries--;
                    console.log(`Network error, retrying... (${retries} retries left)`);
                    if (retries === 0) throw error;
                    await page.waitForTimeout(5000); // Increased from 2000 to 5000ms for Firefox
                }
            }
            
            await page.waitForTimeout(5000); // Increased from 3000 to 5000ms for Firefox
            console.log('✅ Successfully loaded TestMu AI Selenium Playground');
            
            // Click "Input Form Submit"
            console.log('Looking for Input Form Submit link...');
            const inputFormLink = page.locator('text="Input Form Submit"').first();
            await inputFormLink.waitFor({ timeout: 30000, state: 'visible' });
            await page.waitForTimeout(1000);
            await inputFormLink.click({ timeout: 60000 });
            
            await page.waitForLoadState('domcontentloaded');
            await page.waitForTimeout(3000);
            
            const currentUrl = page.url();
            console.log(`Current URL: ${currentUrl}`);
            expect(currentUrl).toContain('input-form');
            console.log('✅ Successfully navigated to Input Form Submit page');
        });
        
        // Step 2: Click "Submit" without filling in any information
        await test.step('Step 2: Click "Submit" without filling in any information', async () => {
            console.log('Clicking Submit button without filling form...');
            await page.waitForTimeout(2000);
            
            // Find the visible Submit button (text="Submit")
            const submitButton = page.locator('button[type="submit"]:visible, button:has-text("Submit"):visible').first();
            await submitButton.waitFor({ timeout: 30000, state: 'visible' });
            await submitButton.click();
            
            await page.waitForTimeout(1000);
            console.log('✅ Clicked Submit button without filling form');
        });
        
        // Step 3: Assert "Please fill in this field." error message
        await test.step('Step 3: Assert "Please fill in this field." error message', async () => {
            console.log('Validating error message...');
            await page.waitForTimeout(2000);
            
            // Find the first required field (usually Name)
            const firstRequiredField = page.locator('input[required]').first();
            
            // Check if the field has validation message using HTML5 validation
            const validationMessage = await firstRequiredField.evaluate((el) => el.validationMessage);
            console.log(`Validation message: "${validationMessage}"`);
            
            // Assert the error message
            expect(validationMessage).toContain('fill');
            console.log('✅ Error message validation passed - "Please fill in this field." is shown');
        });
        
        // Step 4 & 5: Fill in Name, Email, and other fields + Select Country
        await test.step('Step 4-5: Fill in all form fields and select Country', async () => {
            console.log('Filling form fields...');
            await page.waitForTimeout(2000);
            
            // Fill Name (input[name="name"] that is visible)
            const nameField = page.locator('input[name="name"]:visible').first();
            await nameField.waitFor({ timeout: 10000 });
            await nameField.fill('John Doe');
            console.log('✅ Filled Name: John Doe');
            
            // Fill Email (input[name="email"] that is visible)
            const emailField = page.locator('input[name="email"]:visible').first();
            await emailField.waitFor({ timeout: 10000, state: 'visible' });
            await emailField.fill('john.doe@testmuai.com');
            console.log('✅ Filled Email: john.doe@testmuai.com');
            
            // Fill Password
            const passwordField = page.locator('input[name="password"]:visible').first();
            await passwordField.fill('Test@1234');
            console.log('✅ Filled Password');
            
            // Fill Company
            const companyField = page.locator('input[name="company"]:visible').first();
            await companyField.fill('TestMu AI Inc');
            console.log('✅ Filled Company: TestMu AI Inc');
            
            // Fill Website
            const websiteField = page.locator('input[name="website"]:visible').first();
            const websiteCount = await websiteField.count();
            if (websiteCount > 0) {
                await websiteField.fill('https://www.testmuai.com');
                console.log('✅ Filled Website: https://www.testmuai.com');
            }
            
            // Step 5: Select "United States" from Country dropdown
            console.log('Selecting country from dropdown...');
            const countryDropdown = page.locator('select[name="country"]:visible').first();
            await countryDropdown.waitFor({ timeout: 10000 });
            await countryDropdown.selectOption('United States');
            console.log('✅ Selected Country: United States');
            
            // Fill City
            const cityField = page.locator('input[name="city"]:visible').first();
            await cityField.fill('New York');
            console.log('✅ Filled City: New York');
            
            // Fill Address1 (mandatory field)
            const address1Field = page.locator('#inputAddress1').first();
            await address1Field.waitFor({ timeout: 10000 });
            await address1Field.fill('123 Test Street');
            console.log('✅ Filled Address1: 123 Test Street');
            
            // Fill Address2 (mandatory field)
            const address2Field = page.locator('#inputAddress2').first();
            await address2Field.waitFor({ timeout: 10000 });
            await address2Field.fill('Apartment 4B');
            console.log('✅ Filled Address2: Apartment 4B');
            
            // Fill State (mandatory field)
            const stateField = page.locator('input[name="state"]:visible, input[placeholder*="State" i]:visible').first();
            await stateField.waitFor({ timeout: 10000 });
            await stateField.fill('New York');
            console.log('✅ Filled State: New York');
            
            // Fill Zip Code
            const zipField = page.locator('input[name="zip"]:visible, input[placeholder*="Zip" i]:visible').first();
            await zipField.waitFor({ timeout: 10000 });
            await zipField.fill('10001');
            console.log('✅ Filled Zip Code: 10001');
            
            await page.waitForTimeout(1000);
            console.log('✅ All form fields filled successfully');
        });
        
        // Step 6: Fill in all fields and click "Submit"
        await test.step('Step 6: Click Submit button after filling all fields', async () => {
            console.log('Clicking Submit button after filling form...');
            await page.waitForTimeout(2000);
            
            // Find the visible Submit button
            const submitButton = page.locator('button:visible:has-text("Submit")').first();
            await submitButton.waitFor({ timeout: 30000, state: 'visible' });
            await submitButton.click();
            
            await page.waitForTimeout(3000);
            console.log('✅ Clicked Submit button');
        });
        
        // Step 7: Validate success message
        await test.step('Step 7: Validate success message', async () => {
            console.log('Validating success message...');
            await page.waitForTimeout(5000);
            
            // Look for success message - try multiple approaches
            const successMessage = page.locator('.success-msg:not(.hidden), p.success-msg:not(.hidden), .success-msg').first();
            
            // Wait for the element to exist
            await successMessage.waitFor({ timeout: 15000, state: 'attached' });
            
            // Get the text content
            const messageText = await successMessage.textContent();
            console.log(`Success message text: "${messageText}"`);
            
            // Validate the success message
            expect(messageText).toContain('Thanks for contacting us');
            expect(messageText).toContain('we will get back to you shortly');
            console.log('✅ Success message validation passed');
        });
        
        console.log('🎉 Test Scenario 3 completed successfully!');
    });
});
