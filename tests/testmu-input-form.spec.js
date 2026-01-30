const { test, expect } = require('@playwright/test');
const { TestMuPlaygroundPage } = require('../pageObjects/TestMuPlaygroundPage');
const { InputFormSubmitPage } = require('../pageObjects/InputFormSubmitPage');
const testData = require('../testData/inputFormTestData.json');

test.describe('TestMu AI - Input Form Submit Tests', () => {
    let playgroundPage;
    let inputFormPage;

    test.beforeEach(async ({ page }) => {
        playgroundPage = new TestMuPlaygroundPage(page);
        inputFormPage = new InputFormSubmitPage(page);
    });

    test('Test Scenario 3: Input Form Submit Validation', async ({ page }) => {
        // Step 1: Open the playground page and click "Input Form Submit"
        await playgroundPage.navigateToPlayground();
        await playgroundPage.clickInputFormSubmit();

        // Step 2: Click "Submit" without filling any information
        await inputFormPage.clickSubmit();

        // Step 3: Assert "Please fill in this field." error message
        const validationMessage = await inputFormPage.getValidationMessage();
        expect(validationMessage).toBe(testData.inputForm.expectedErrorMessage);

        // Step 4: Fill in Name, Email, and other fields
        await inputFormPage.fillFormFields(testData.inputForm.validFormData);

        // Step 5: From the Country drop-down, select "United States" using text property
        await inputFormPage.selectCountry(testData.inputForm.country);

        // Select hosting option
        await inputFormPage.selectHosting();

        // Step 6: Fill in all fields and click "Submit"
        await inputFormPage.clickSubmit();

        // Step 7: Validate the success message
        const isSuccessMessageDisplayed = await inputFormPage.validateSuccessMessage(
            testData.inputForm.expectedSuccessMessage
        );
        expect(isSuccessMessageDisplayed).toBeTruthy();

        // Additional assertion for exact success message
        const successMessage = await inputFormPage.getSuccessMessage();
        expect(successMessage).toContain(testData.inputForm.expectedSuccessMessage);
    });
});