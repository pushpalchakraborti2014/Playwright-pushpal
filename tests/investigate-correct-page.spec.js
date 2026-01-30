const { test, expect } = require('@playwright/test');

test('Investigate TestMu AI Playground', async ({ page }) => {
    console.log('🔍 Investigating TestMu AI playground...');
    
    // Navigate to the main playground
    await page.goto('https://www.testmu.ai/selenium-playground/', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });
    
    await page.waitForTimeout(3000);
    console.log('✅ Loaded main playground');
    console.log('🔗 Current URL:', page.url());
    
    // Find all links on the page
    console.log('\n🔗 AVAILABLE LINKS:');
    const links = await page.locator('a').all();
    for (let i = 0; i < Math.min(links.length, 20); i++) {
        const link = links[i];
        const text = await link.textContent();
        const href = await link.getAttribute('href');
        if (text?.includes('Form') || text?.includes('form')) {
            console.log(`Link ${i + 1}: "${text?.trim()}" -> ${href}`);
        }
    }
    
    // Look for Simple Form Demo link
    console.log('\n🎯 LOOKING FOR SIMPLE FORM DEMO:');
    const simpleFormLink = page.locator('text="Simple Form Demo"');
    const isVisible = await simpleFormLink.isVisible();
    console.log('Simple Form Demo link visible:', isVisible);
    
    if (isVisible) {
        console.log('✅ Found Simple Form Demo link, clicking...');
        await simpleFormLink.click();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(3000);
        
        console.log('🔗 New URL:', page.url());
        
        // Now investigate the form page
        console.log('\n📝 FORM ELEMENTS:');
        const inputs = await page.locator('input').all();
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            const type = await input.getAttribute('type');
            const placeholder = await input.getAttribute('placeholder');
            const name = await input.getAttribute('name');
            const id = await input.getAttribute('id');
            console.log(`Input ${i + 1}: type="${type}" placeholder="${placeholder}" name="${name}" id="${id}"`);
        }
        
        console.log('\n🔘 BUTTONS:');
        const buttons = await page.locator('button, input[type="button"], input[type="submit"]').all();
        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i];
            const text = await button.textContent();
            const value = await button.getAttribute('value');
            const id = await button.getAttribute('id');
            console.log(`Button ${i + 1}: text="${text?.trim()}" value="${value}" id="${id}"`);
        }
        
        console.log('\n📺 CHECKING FOR MESSAGE DISPLAY AREAS:');
        // Look for common display patterns
        const possibleDisplays = await page.locator('[id*="message"], [id*="display"], [class*="message"], [class*="display"], [id*="output"], [class*="output"]').all();
        for (let i = 0; i < possibleDisplays.length; i++) {
            const display = possibleDisplays[i];
            const tagName = await display.evaluate(el => el.tagName);
            const id = await display.getAttribute('id');
            const className = await display.getAttribute('class');
            const text = await display.textContent();
            console.log(`Display ${i + 1}: ${tagName} id="${id}" class="${className}" text="${text?.substring(0, 50)}..."`);
        }
        
        // Test the form
        console.log('\n🧪 TESTING FORM INTERACTION:');
        const messageInput = page.locator('input[type="text"]').first();
        if (await messageInput.isVisible()) {
            await messageInput.fill('Test Message 123');
            console.log('✅ Entered test message');
            
            const submitButton = page.locator('button, input[type="submit"]').first();
            if (await submitButton.isVisible()) {
                await submitButton.click();
                console.log('✅ Clicked submit button');
                
                await page.waitForTimeout(2000);
                
                // Check for the message anywhere on the page
                const pageText = await page.textContent('body');
                if (pageText.includes('Test Message 123')) {
                    console.log('✅ SUCCESS: Test message found on the page!');
                    
                    // Find where it appears
                    const messageElements = await page.locator(':has-text("Test Message 123")').all();
                    for (let i = 0; i < messageElements.length; i++) {
                        const element = messageElements[i];
                        const tagName = await element.evaluate(el => el.tagName);
                        const id = await element.getAttribute('id');
                        const className = await element.getAttribute('class');
                        console.log(`Message found in: ${tagName} id="${id}" class="${className}"`);
                    }
                } else {
                    console.log('❌ Test message not found on the page');
                }
            }
        }
        
        // Take screenshot
        await page.screenshot({ path: 'simple-form-demo-investigation.png', fullPage: true });
        console.log('📸 Screenshot saved');
    }
});