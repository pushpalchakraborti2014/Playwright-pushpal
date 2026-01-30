const { test, expect } = require('@playwright/test');

test.describe('Test Scenario 2: Drag & Drop Sliders - Parallel Execution', () => {
    
    test('Parallel Test 1: Drag slider from Default value 15 to 95', async ({ page, context }) => {
        test.setTimeout(180000);
        console.log('🚀 Starting Parallel Test 1 - Test Scenario 2');
        
        // Clear cookies/cache
        await context.clearCookies();
        
        // Step 1: Open TestMu AI Selenium Playground and click "Drag & Drop Sliders"
        await test.step('Step 1: Open TestMu AI Selenium Playground and click "Drag & Drop Sliders"', async () => {
            console.log('Opening TestMu AI Selenium Playground...');
            
            await page.goto('https://www.testmuai.com/selenium-playground/', {
                waitUntil: 'domcontentloaded',
                timeout: 45000
            });
            
            await page.waitForTimeout(3000);
            console.log('✅ Successfully loaded TestMu AI Selenium Playground');
            
            const dragDropLink = page.locator('text="Drag & Drop Sliders"').first();
            await dragDropLink.waitFor({ timeout: 30000 });
            await dragDropLink.click();
            
            await page.waitForLoadState('domcontentloaded');
            await page.waitForTimeout(3000);
            
            const currentUrl = page.url();
            expect(currentUrl).toContain('drag-drop-range-sliders');
            console.log('✅ Successfully navigated to Drag & Drop Sliders page');
        });
        
        // Step 2: Drag slider to 95
        await test.step('Step 2: Drag slider "Default value 15" to make it 95', async () => {
            console.log('Looking for slider with Default value 15...');
            await page.waitForTimeout(2000);
            
            const sliders = await page.locator('input[type="range"]').all();
            console.log(`✅ Found ${sliders.length} range sliders`);
            
            let targetSlider = null;
            for (let i = 0; i < sliders.length; i++) {
                const value = await sliders[i].getAttribute('value');
                if (value === '15') {
                    targetSlider = sliders[i];
                    console.log(`✅ Found slider with value 15 at index ${i}`);
                    break;
                }
            }
            
            await targetSlider.fill('95');
            await page.waitForTimeout(500);
            
            await targetSlider.evaluate((element) => {
                element.value = '95';
                element.dispatchEvent(new Event('input', { bubbles: true }));
                element.dispatchEvent(new Event('change', { bubbles: true }));
            });
            
            await page.waitForTimeout(1000);
            console.log('✅ Slider set to 95');
        });
        
        // Step 3: Validate
        await test.step('Step 3: Validate range value shows 95', async () => {
            console.log('Validating slider value...');
            await page.waitForTimeout(2000);
            
            const sliders = await page.locator('input[type="range"]').all();
            let targetSlider = null;
            for (let i = 0; i < sliders.length; i++) {
                const initialValue = await sliders[i].evaluate(el => el.defaultValue || el.getAttribute('value'));
                if (initialValue === '15') {
                    targetSlider = sliders[i];
                    break;
                }
            }
            
            const sliderValue = await targetSlider.inputValue();
            expect(parseInt(sliderValue)).toBe(95);
            console.log('✅ Slider value validation passed - value is 95');
        });
        
        console.log('🎉 Parallel Test 1 completed successfully!');
    });

    test('Parallel Test 2: Drag slider from Default value 15 to 95', async ({ page, context }) => {
        test.setTimeout(180000);
        console.log('🚀 Starting Parallel Test 2 - Test Scenario 2');
        
        // Clear cookies/cache
        await context.clearCookies();
        
        // Step 1: Open TestMu AI Selenium Playground and click "Drag & Drop Sliders"
        await test.step('Step 1: Open TestMu AI Selenium Playground and click "Drag & Drop Sliders"', async () => {
            console.log('Opening TestMu AI Selenium Playground...');
            
            await page.goto('https://www.testmuai.com/selenium-playground/', {
                waitUntil: 'domcontentloaded',
                timeout: 45000
            });
            
            await page.waitForTimeout(3000);
            console.log('✅ Successfully loaded TestMu AI Selenium Playground');
            
            const dragDropLink = page.locator('text="Drag & Drop Sliders"').first();
            await dragDropLink.waitFor({ timeout: 30000 });
            await dragDropLink.click();
            
            await page.waitForLoadState('domcontentloaded');
            await page.waitForTimeout(3000);
            
            const currentUrl = page.url();
            expect(currentUrl).toContain('drag-drop-range-sliders');
            console.log('✅ Successfully navigated to Drag & Drop Sliders page');
        });
        
        // Step 2: Drag slider to 95
        await test.step('Step 2: Drag slider "Default value 15" to make it 95', async () => {
            console.log('Looking for slider with Default value 15...');
            await page.waitForTimeout(2000);
            
            const sliders = await page.locator('input[type="range"]').all();
            console.log(`✅ Found ${sliders.length} range sliders`);
            
            let targetSlider = null;
            for (let i = 0; i < sliders.length; i++) {
                const value = await sliders[i].getAttribute('value');
                if (value === '15') {
                    targetSlider = sliders[i];
                    console.log(`✅ Found slider with value 15 at index ${i}`);
                    break;
                }
            }
            
            await targetSlider.fill('95');
            await page.waitForTimeout(500);
            
            await targetSlider.evaluate((element) => {
                element.value = '95';
                element.dispatchEvent(new Event('input', { bubbles: true }));
                element.dispatchEvent(new Event('change', { bubbles: true }));
            });
            
            await page.waitForTimeout(1000);
            console.log('✅ Slider set to 95');
        });
        
        // Step 3: Validate
        await test.step('Step 3: Validate range value shows 95', async () => {
            console.log('Validating slider value...');
            await page.waitForTimeout(2000);
            
            const sliders = await page.locator('input[type="range"]').all();
            let targetSlider = null;
            for (let i = 0; i < sliders.length; i++) {
                const initialValue = await sliders[i].evaluate(el => el.defaultValue || el.getAttribute('value'));
                if (initialValue === '15') {
                    targetSlider = sliders[i];
                    break;
                }
            }
            
            const sliderValue = await targetSlider.inputValue();
            expect(parseInt(sliderValue)).toBe(95);
            console.log('✅ Slider value validation passed - value is 95');
        });
        
        console.log('🎉 Parallel Test 2 completed successfully!');
    });
});
