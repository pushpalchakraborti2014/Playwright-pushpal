const BasePage = require('./BasePage');

class SimpleFormDemoPage extends BasePage {
    constructor(page) {
        super(page);
        
        // Selectors
        this.selectors = {
            enterMessageInput: 'input[placeholder="Enter message"]',
            getCheckedValueButton: 'button:has-text("Get Checked Value")',
            yourMessageDisplay: '[id="display-message"]',
        };
    }

    async enterMessage(message) {
        await this.page.fill(this.selectors.enterMessageInput, message);
    }

    async clickGetCheckedValue() {
        await this.page.click(this.selectors.getCheckedValueButton);
    }

    async getDisplayedMessage() {
        return await this.page.textContent(this.selectors.yourMessageDisplay);
    }

    async validateDisplayedMessage(expectedMessage) {
        const displayedMessage = await this.getDisplayedMessage();
        return displayedMessage.includes(expectedMessage);
    }
}

module.exports = { SimpleFormDemoPage };