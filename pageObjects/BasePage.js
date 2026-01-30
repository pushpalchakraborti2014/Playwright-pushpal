class BasePage {
    constructor(page) {
        this.page = page;
    }

    /**
     * Navigate to a specific URL
     * @param {string} url - The URL to navigate to
     */
    async goto(url) {
        await this.page.goto(url);
    }

    /**
     * Wait for an element to be visible
     * @param {string} selector - The selector to wait for
     * @param {number} timeout - Timeout in milliseconds
     */
    async waitForElement(selector, timeout = 30000) {
        await this.page.waitForSelector(selector, { state: 'visible', timeout });
    }

    /**
     * Click on an element
     * @param {string} selector - The selector to click
     */
    async click(selector) {
        await this.waitForElement(selector);
        await this.page.click(selector);
    }

    /**
     * Type text into an element
     * @param {string} selector - The selector to type into
     * @param {string} text - The text to type
     */
    async type(selector, text) {
        await this.waitForElement(selector);
        await this.page.fill(selector, text);
    }

    /**
     * Get text content from an element
     * @param {string} selector - The selector to get text from
     * @returns {Promise<string>} The text content
     */
    async getText(selector) {
        await this.waitForElement(selector);
        return await this.page.textContent(selector);
    }

    /**
     * Check if an element is visible
     * @param {string} selector - The selector to check
     * @returns {Promise<boolean>} True if visible, false otherwise
     */
    async isVisible(selector) {
        try {
            return await this.page.isVisible(selector);
        } catch (error) {
            return false;
        }
    }

    /**
     * Wait for page to load completely
     */
    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Take a screenshot
     * @param {string} filename - The filename for the screenshot
     */
    async takeScreenshot(filename) {
        await this.page.screenshot({ path: `screenshots/${filename}`, fullPage: true });
    }

    /**
     * Scroll to an element
     * @param {string} selector - The selector to scroll to
     */
    async scrollToElement(selector) {
        await this.page.locator(selector).scrollIntoViewIfNeeded();
    }

    /**
     * Select option from dropdown
     * @param {string} selector - The dropdown selector
     * @param {string} value - The value to select
     */
    async selectDropdown(selector, value) {
        await this.waitForElement(selector);
        await this.page.selectOption(selector, value);
    }

    /**
     * Upload file
     * @param {string} selector - The file input selector
     * @param {string} filePath - Path to the file to upload
     */
    async uploadFile(selector, filePath) {
        await this.page.setInputFiles(selector, filePath);
    }

    /**
     * Get current URL
     * @returns {string} Current page URL
     */
    getCurrentUrl() {
        return this.page.url();
    }

    /**
     * Get page title
     * @returns {Promise<string>} Page title
     */
    async getTitle() {
        return await this.page.title();
    }

    /**
     * Wait for specific amount of time
     * @param {number} milliseconds - Time to wait in milliseconds
     */
    async wait(milliseconds) {
        await this.page.waitForTimeout(milliseconds);
    }

    /**
     * Handle JavaScript alerts
     * @param {string} action - 'accept' or 'dismiss'
     * @param {string} text - Text to enter in prompt (optional)
     */
    async handleAlert(action = 'accept', text = '') {
        this.page.on('dialog', async dialog => {
            if (text) {
                await dialog.accept(text);
            } else if (action === 'accept') {
                await dialog.accept();
            } else {
                await dialog.dismiss();
            }
        });
    }

    /**
     * Switch to new tab/window
     * @returns {Promise<Page>} New page object
     */
    async switchToNewTab() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            // Trigger action that opens new tab
        ]);
        return newPage;
    }
}

module.exports = BasePage;