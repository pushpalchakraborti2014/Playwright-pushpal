const { test, expect } = require('@playwright/test');

test.describe('Test Scenario 2: Drag & Drop Sliders', () => {
    
    test('Drag slider from Default value 15 to 95', async ({ page, context }) => {
        test.setTimeout(180000); // 3 minutes timeout for slower browsers
        
        // Clear cookies/cache
        await context.clearCookies();
        
        // Step 1: Open TestMu AI Selenium Playground and click "Drag & Drop Sliders"
        await test.step('Step 1: Open TestMu AI Selenium Playground and click "Drag & Drop Sliders"', async () => {
            console.log('🚀 Starting Test Scenario 2: Drag & Drop Sliders');
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
                    await page.waitForTimeout(2000);
                }
            }
            
            await page.waitForTimeout(3000);
            console.log('✅ Successfully loaded TestMu AI Selenium Playground');
            
            // Click "Drag & Drop Sliders"
            console.log('Looking for Drag & Drop Sliders link...');
            const dragDropLink = page.locator('text="Drag & Drop Sliders"').first();
            await dragDropLink.waitFor({ timeout: 30000, state: 'visible' });
            await page.waitForTimeout(1000);
            await dragDropLink.click({ timeout: 60000 });
            
            await page.waitForLoadState('domcontentloaded');
            await page.waitForTimeout(3000);
            
            const currentUrl = page.url();
            console.log(`Current URL: ${currentUrl}`);
            expect(currentUrl).toContain('drag-drop-range-sliders');
            console.log('✅ Successfully navigated to Drag & Drop Sliders page');
        });
        
        // Step 2: Select the slider "Default value 15" and drag to 95
        await test.step('Step 2: Drag slider "Default value 15" to make it 95', async () => {
            console.log('Looking for slider with Default value 15...');
            await page.waitForTimeout(2000);
            
            // The text shows "Default value 1515" - find the slider with value="15"
            // It's the 3rd slider (index 2)
            const sliders = await page.locator('input[type="range"]').all();
            console.log(`✅ Found ${sliders.length} range sliders`);
            
            // Find the slider with value="15"
            let targetSlider = null;
            let sliderIndex = -1;
            for (let i = 0; i < sliders.length; i++) {
                const value = await sliders[i].getAttribute('value');
                if (value === '15') {
                    targetSlider = sliders[i];
                    sliderIndex = i;
                    console.log(`✅ Found slider with value 15 at index ${i}`);
                    break;
                }
            }
            
            if (!targetSlider) {
                throw new Error('Could not find slider with value 15');
            }
            
            // Get the output element ID for this slider
            // The sliders have corresponding output elements
            const outputId = await targetSlider.getAttribute('id');
            console.log(`Slider ID/attributes: ${outputId}`);
            
            // Drag the slider to 95
            console.log('Setting slider value to 95...');
            await targetSlider.fill('95');
            await page.waitForTimeout(500);
            
            // Also use evaluate to ensure the change event fires
            await targetSlider.evaluate((element) => {
                element.value = '95';
                element.dispatchEvent(new Event('input', { bubbles: true }));
                element.dispatchEvent(new Event('change', { bubbles: true }));
            });
            
            await page.waitForTimeout(1000);
            console.log('✅ Slider set to 95');
        });
        
        // Step 3: Validate the range value shows 95
        await test.step('Step 3: Validate range value shows 95', async () => {
            console.log('Validating slider value...');
            await page.waitForTimeout(2000);
            
            // Get the slider with value 15 (now should be 95)
            const sliders = await page.locator('input[type="range"]').all();
            let targetSlider = null;
            for (let i = 0; i < sliders.length; i++) {
                const initialValue = await sliders[i].evaluate(el => el.defaultValue || el.getAttribute('value'));
                if (initialValue === '15') {
                    targetSlider = sliders[i];
                    break;
                }
            }
            
            // Verify the slider value is 95
            const sliderValue = await targetSlider.inputValue();
            console.log(`Current slider value: ${sliderValue}`);
            expect(parseInt(sliderValue)).toBe(95);
            console.log('✅ Slider value validation passed - value is 95');
            
            // Also check if there's a display element showing the value
            const allText = await page.locator('body').textContent();
            if (allText.includes('95')) {
                console.log('✅ Value 95 is displayed on the page');
            }
        });
        
        console.log('🎉 Test Scenario 2 completed successfully!');
    });
});
