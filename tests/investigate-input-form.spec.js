const { test } = require('@playwright/test');

test('Investigate Input Form page structure', async ({ page }) => {
    await page.goto('https://www.testmuai.com/selenium-playground/input-form-demo/', {
        waitUntil: 'domcontentloaded',
        timeout: 45000
    });
    
    await page.waitForTimeout(3000);
    
    // Get all buttons
    const buttons = await page.locator('button').all();
    console.log(`=== FOUND ${buttons.length} BUTTONS ===`);
    
    for (let i = 0; i < buttons.length; i++) {
        const text = await buttons[i].textContent();
        const type = await buttons[i].getAttribute('type');
        const isVisible = await buttons[i].isVisible();
        const id = await buttons[i].getAttribute('id');
        console.log(`Button ${i + 1}: text="${text?.trim()}", type="${type}", visible=${isVisible}, id="${id}"`);
    }
    console.log('\n');
    
    // Get all input fields
    const inputs = await page.locator('input').all();
    console.log(`=== FOUND ${inputs.length} INPUT FIELDS ===`);
    
    for (let i = 0; i < Math.min(10, inputs.length); i++) {
        const name = await inputs[i].getAttribute('name');
        const placeholder = await inputs[i].getAttribute('placeholder');
        const required = await inputs[i].getAttribute('required');
        const type = await inputs[i].getAttribute('type');
        console.log(`Input ${i + 1}: name="${name}", placeholder="${placeholder}", type="${type}", required="${required !== null}"`);
    }
    console.log('\n');
    
    // Get page text
    const bodyText = await page.locator('body').textContent();
    console.log('=== PAGE TEXT (first 1000 chars) ===');
    console.log(bodyText.substring(0, 1000));
});
