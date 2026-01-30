const BasePage = require('./BasePage');

class TestMuPlaygroundPage extends BasePage {
    constructor(page) {
        super(page);
        
        // Selectors
        this.selectors = {
            simpleFormDemoLink: 'text="Simple Form Demo"',
            dragDropSlidersLink: 'text="Drag & Drop Sliders"',
            inputFormSubmitLink: 'text="Input Form Submit"',
        };
    }

    async navigateToPlayground() {
        await this.page.goto('https://www.testmu.ai/selenium-playground/');
        await this.page.waitForLoadState('networkidle');
    }

    async clickSimpleFormDemo() {
        await this.page.click(this.selectors.simpleFormDemoLink);
        await this.page.waitForLoadState('networkidle');
    }

    async clickDragDropSliders() {
        await this.page.click(this.selectors.dragDropSlidersLink);
        await this.page.waitForLoadState('networkidle');
    }

    async clickInputFormSubmit() {
        await this.page.click(this.selectors.inputFormSubmitLink);
        await this.page.waitForLoadState('networkidle');
    }

    async validateURL(expectedURLPart) {
        const currentURL = this.page.url();
        return currentURL.includes(expectedURLPart);
    }
}

module.exports = { TestMuPlaygroundPage };