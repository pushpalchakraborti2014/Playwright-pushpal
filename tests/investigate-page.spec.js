const { test, expect } = require('@playwright/test');

test('Investigate TestMu AI Simple Form Demo Page', async ({ page }) => {
    console.log('🔍 Investigating TestMu AI Simple Form Demo page structure...');
    
    // Navigate to the simple form demo page
    await page.goto('https://www.testmuai.com/selenium-playground/simple-form-demo/', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });
    
    await page.waitForTimeout(3000);
    
    console.log('📋 Page title:', await page.title());
    console.log('🔗 Current URL:', page.url());
    
    // Find all input elements
    console.log('\n📝 INPUT ELEMENTS:');
    const inputs = await page.locator('input').all();
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        const type = await input.getAttribute('type');
        const placeholder = await input.getAttribute('placeholder');
        const name = await input.getAttribute('name');
        const id = await input.getAttribute('id');
        console.log(`Input ${i + 1}: type="${type}" placeholder="${placeholder}" name="${name}" id="${id}"`);
    }
    
    // Find all button elements
    console.log('\n🔘 BUTTON ELEMENTS:');
    const buttons = await page.locator('button, input[type="button"], input[type="submit"]').all();
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        const text = await button.textContent();
        const value = await button.getAttribute('value');
        const id = await button.getAttribute('id');
        console.log(`Button ${i + 1}: text="${text}" value="${value}" id="${id}"`);
    }
    
    // Find potential display areas
    console.log('\n📺 POTENTIAL DISPLAY AREAS:');
    const displayAreas = await page.locator('div, span, p').all();
    for (let i = 0; i < Math.min(displayAreas.length, 10); i++) {
        const area = displayAreas[i];
        const id = await area.getAttribute('id');
        const className = await area.getAttribute('class');
        const text = await area.textContent();
        if (id || className || (text && text.length < 100)) {
            console.log(`Display ${i + 1}: id="${id}" class="${className}" text="${text?.substring(0, 50)}..."`);
        }
    }
    
    // Try to interact with the form
    console.log('\n🎬 TESTING FORM INTERACTION:');
    
    // Find the message input
    const messageInput = page.locator('input[type="text"]').first();
    const isVisible = await messageInput.isVisible();
    console.log('Message input visible:', isVisible);
    
    if (isVisible) {
        await messageInput.fill('Test Message');
        console.log('✅ Message entered');
        
        // Find and click button
        const showButton = page.locator('button, input[type="submit"]').first();
        const buttonVisible = await showButton.isVisible();
        console.log('Button visible:', buttonVisible);
        
        if (buttonVisible) {
            await showButton.click();
            console.log('✅ Button clicked');
            
            await page.waitForTimeout(2000);
            
            // Check for display updates
            console.log('\n📋 CHECKING FOR DISPLAY UPDATES:');
            const allText = await page.textContent('body');
            if (allText.includes('Test Message')) {
                console.log('✅ Test message found in page content!');
                
                // Find exact location
                const elements = await page.locator('*:has-text("Test Message")').all();
                for (let i = 0; i < elements.length; i++) {
                    const element = elements[i];
                    const tagName = await element.evaluate(el => el.tagName);
                    const id = await element.getAttribute('id');
                    const className = await element.getAttribute('class');
                    console.log(`Found in: ${tagName} id="${id}" class="${className}"`);
                }
            } else {
                console.log('❌ Test message not found in page content');
            }
        }
    }
    
    // Take a screenshot for reference
    await page.screenshot({ path: 'investigation-screenshot.png', fullPage: true });
    console.log('📸 Screenshot saved as investigation-screenshot.png');
});