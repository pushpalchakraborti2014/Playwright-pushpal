const { test, expect } = require('@playwright/test');
const { TestMuPlaygroundPage } = require('../pageObjects/TestMuPlaygroundPage');
const { DragDropSlidersPage } = require('../pageObjects/DragDropSlidersPage');

test.describe('TestMu AI - Drag & Drop Sliders Tests', () => {
    let playgroundPage;
    let slidersPage;

    test.beforeEach(async ({ page }) => {
        playgroundPage = new TestMuPlaygroundPage(page);
        slidersPage = new DragDropSlidersPage(page);
    });

    test('Test Scenario 2: Drag & Drop Sliders Validation', async ({ page }) => {
        // Step 1: Open the playground page and click "Drag & Drop Sliders"
        await playgroundPage.navigateToPlayground();
        await playgroundPage.clickDragDropSliders();

        // Step 2: Select the slider "Default value 15" and drag to make it 95
        const targetValue = 95;
        await slidersPage.dragSliderTo(targetValue);

        // Validate whether the range value shows 95
        const isSliderValueCorrect = await slidersPage.validateSliderValue(targetValue);
        expect(isSliderValueCorrect).toBeTruthy();

        // Additional assertion for exact value
        const actualValue = await slidersPage.getSliderValue();
        expect(actualValue).toBe(targetValue);
    });
});