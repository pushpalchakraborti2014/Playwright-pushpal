const { chromium } = require('@playwright/test');
const { test, expect } = require('@playwright/test');

const LT_USERNAME = process.env.LT_USERNAME || 'pushpalchakraborti2014';
const LT_ACCESS_KEY = process.env.LT_ACCESS_KEY || 'LT_22KXi0gCk9yvDkZTFhf60N7mxt3jsXVOo7dRZhOqU2SylOt';

function getCapabilities(browserName, testName) {
    return {
        'browserName': browserName,
        'browserVersion': 'latest',
        'LT:Options': {
            'platform': 'Windows 10',
            'build': 'TestMu AI - Scenario 2 - LambdaTest',
            'name': testName,
            'user': LT_USERNAME,
            'accessKey': LT_ACCESS_KEY,
            'network': true,
            'video': true,
            'console': true,
            'screenshot': true,
            'w3c': true
        }
    };
}

test.describe('Test Scenario 2: Drag & Drop Sliders - LambdaTest', () => {
    
    test('Run on Chrome - LambdaTest', async () => {
        const capabilities = getCapabilities('Chrome', 'Scenario 2 - Drag Drop Sliders - Chrome');
        const wsEndpoint = `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`;
        
        const browser = await chromium.connect(wsEndpoint);
        const context = await browser.newContext();
        const page = await context.newPage();
        
        try {
            test.setTimeout(180000);
            
            console.log('🚀 Starting Test Scenario 2 on LambdaTest Cloud');
            await page.goto('https://www.testmuai.com/selenium-playground/', { waitUntil: 'domcontentloaded', timeout: 60000 });
            await page.waitForTimeout(3000);
            
            const dragDropLink = page.locator('text="Drag & Drop Sliders"').first();
            await dragDropLink.click({ timeout: 60000 });
            await page.waitForTimeout(3000);
            
            const sliders = await page.locator('input[type="range"]').all();
            const targetSlider = sliders[2];
            await targetSlider.fill('95');
            await targetSlider.dispatchEvent('change');
            await page.waitForTimeout(1000);
            
            const sliderValue = await targetSlider.inputValue();
            expect(parseInt(sliderValue)).toBe(95);
            console.log('✅ Slider value validated: 95');
            
            console.log('🎉 Test Scenario 2 completed successfully!');
        } finally {
            await page.close();
            await context.close();
            await browser.close();
        }
    });
    
    test('Run on Firefox - LambdaTest', async () => {
        const capabilities = getCapabilities('pw-firefox', 'Scenario 2 - Drag Drop Sliders - Firefox');
        const wsEndpoint = `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`;
        
        const browser = await chromium.connect(wsEndpoint);
        const context = await browser.newContext();
        const page = await context.newPage();
        
        try {
            test.setTimeout(180000);
            
            console.log('🚀 Starting Test Scenario 2 on LambdaTest Cloud (Firefox)');
            await page.goto('https://www.testmuai.com/selenium-playground/', { waitUntil: 'domcontentloaded', timeout: 60000 });
            await page.waitForTimeout(3000);
            
            const dragDropLink = page.locator('text="Drag & Drop Sliders"').first();
            await dragDropLink.click({ timeout: 60000 });
            await page.waitForTimeout(3000);
            
            const sliders = await page.locator('input[type="range"]').all();
            const targetSlider = sliders[2];
            await targetSlider.fill('95');
            await targetSlider.dispatchEvent('change');
            await page.waitForTimeout(1000);
            
            const sliderValue = await targetSlider.inputValue();
            expect(parseInt(sliderValue)).toBe(95);
            console.log('✅ Slider value validated: 95');
            
            console.log('🎉 Test Scenario 2 completed successfully!');
        } finally {
            await page.close();
            await context.close();
            await browser.close();
        }
    });
});
