const { test } = require('@playwright/test');

test('Investigate Drag & Drop Sliders page structure', async ({ page }) => {
    await page.goto('https://www.testmuai.com/selenium-playground/drag-drop-range-sliders-demo/', {
        waitUntil: 'domcontentloaded',
        timeout: 45000
    });
    
    await page.waitForTimeout(3000);
    
    // Get all text content
    const bodyText = await page.locator('body').textContent();
    console.log('=== PAGE TEXT CONTENT ===');
    console.log(bodyText);
    console.log('\n');
    
    // Get all range sliders
    const sliders = await page.locator('input[type="range"]').all();
    console.log(`=== FOUND ${sliders.length} RANGE SLIDERS ===`);
    
    for (let i = 0; i < sliders.length; i++) {
        const value = await sliders[i].getAttribute('value');
        const min = await sliders[i].getAttribute('min');
        const max = await sliders[i].getAttribute('max');
        const id = await sliders[i].getAttribute('id');
        console.log(`Slider ${i + 1}: id="${id}", value="${value}", min="${min}", max="${max}"`);
    }
    console.log('\n');
    
    // Get all elements that might contain "15"
    const elementsWithDefault = await page.locator('*:has-text("Default")').all();
    console.log(`=== FOUND ${elementsWithDefault.length} ELEMENTS WITH "Default" ===`);
    for (let i = 0; i < Math.min(5, elementsWithDefault.length); i++) {
        const text = await elementsWithDefault[i].textContent();
        console.log(`Element ${i + 1}: "${text}"`);
    }
    console.log('\n');
    
    // Get page HTML
    const html = await page.content();
    console.log('=== HTML SNIPPET (first 2000 chars) ===');
    console.log(html.substring(0, 2000));
});
