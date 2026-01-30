const BasePage = require('./BasePage');

class InputFormSubmitPage extends BasePage {
    constructor(page) {
        super(page);
        
        // Selectors
        this.selectors = {
            firstNameInput: 'input[name="first_name"]',
            lastNameInput: 'input[name="last_name"]',
            emailInput: 'input[name="email"]',
            phoneInput: 'input[name="phone"]',
            addressInput: 'input[name="address"]',
            cityInput: 'input[name="city"]',
            stateSelect: 'select[name="state"]',
            zipCodeInput: 'input[name="zip"]',
            websiteInput: 'input[name="website"]',
            hostingRadio: 'input[name="hosting"][value="yes"]',
            commentTextarea: 'textarea[name="comment"]',
            submitButton: 'button:has-text("Submit")',
            successMessage: '.alert-success',
            validationMessage: 'input:invalid',
            countrySelect: 'select[name="country"]',
        };
    }

    async clickSubmit() {
        await this.page.click(this.selectors.submitButton);
    }

    async getValidationMessage() {
        try {
            const invalidInput = this.page.locator(this.selectors.validationMessage).first();
            return await invalidInput.evaluate((element) => element.validationMessage);
        } catch (error) {
            return null;
        }
    }

    async validateErrorMessage(expectedMessage) {
        const validationMessage = await this.getValidationMessage();
        return validationMessage === expectedMessage;
    }

    async fillFormFields(formData) {
        if (formData.firstName) {
            await this.page.fill(this.selectors.firstNameInput, formData.firstName);
        }
        if (formData.lastName) {
            await this.page.fill(this.selectors.lastNameInput, formData.lastName);
        }
        if (formData.email) {
            await this.page.fill(this.selectors.emailInput, formData.email);
        }
        if (formData.phone) {
            await this.page.fill(this.selectors.phoneInput, formData.phone);
        }
        if (formData.address) {
            await this.page.fill(this.selectors.addressInput, formData.address);
        }
        if (formData.city) {
            await this.page.fill(this.selectors.cityInput, formData.city);
        }
        if (formData.state) {
            await this.page.selectOption(this.selectors.stateSelect, formData.state);
        }
        if (formData.zipCode) {
            await this.page.fill(this.selectors.zipCodeInput, formData.zipCode);
        }
        if (formData.website) {
            await this.page.fill(this.selectors.websiteInput, formData.website);
        }
        if (formData.comment) {
            await this.page.fill(this.selectors.commentTextarea, formData.comment);
        }
    }

    async selectCountry(countryName) {
        await this.page.selectOption(this.selectors.countrySelect, { label: countryName });
    }

    async selectHosting() {
        await this.page.check(this.selectors.hostingRadio);
    }

    async getSuccessMessage() {
        try {
            await this.page.waitForSelector(this.selectors.successMessage, { timeout: 10000 });
            return await this.page.textContent(this.selectors.successMessage);
        } catch (error) {
            return null;
        }
    }

    async validateSuccessMessage(expectedMessage) {
        const successMessage = await this.getSuccessMessage();
        return successMessage && successMessage.includes(expectedMessage);
    }
}

module.exports = { InputFormSubmitPage };