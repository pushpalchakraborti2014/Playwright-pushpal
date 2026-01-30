const { test, expect } = require('@playwright/test');

test('Validation Test - Basic Setup Check', async ({ page }) => {
    console.log('🚀 Running validation test...');
    
    // Test basic Playwright functionality
    await page.goto('https://www.testmu.ai/selenium-playground/');
    
    // Check if page loads
    const title = await page.title();
    console.log(`✅ Page title: ${title}`);
    expect(title).toBeTruthy();
    
    // Check if we can find the Simple Form Demo link
    const simpleFormLink = page.locator('text="Simple Form Demo"');
    await expect(simpleFormLink).toBeVisible({ timeout: 10000 });
    console.log('✅ Simple Form Demo link found');
    
    // Check if we can find the Drag & Drop Sliders link
    const slidersLink = page.locator('text="Drag & Drop Sliders"');
    await expect(slidersLink).toBeVisible({ timeout: 10000 });
    console.log('✅ Drag & Drop Sliders link found');
    
    // Check if we can find the Input Form Submit link
    const inputFormLink = page.locator('text="Input Form Submit"');
    await expect(inputFormLink).toBeVisible({ timeout: 10000 });
    console.log('✅ Input Form Submit link found');
    
    console.log('✅ Validation test completed successfully!');
});