const BasePage = require('./BasePage');

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        
        // Page locators
        this.usernameInput = '#username';
        this.passwordInput = '#password';
        this.loginButton = '#login-button';
        this.errorMessage = '.error-message';
        this.forgotPasswordLink = '#forgot-password';
        this.signUpLink = '#sign-up';
        this.rememberMeCheckbox = '#remember-me';
        this.loginForm = '#login-form';
        this.pageTitle = 'h1';
    }

    /**
     * Navigate to login page
     * @param {string} url - Login page URL
     */
    async goto(url = '/login') {
        await super.goto(url);
        await this.waitForPageLoad();
    }

    /**
     * Perform login with username and password
     * @param {string} username - Username or email
     * @param {string} password - Password
     */
    async login(username, password) {
        await this.type(this.usernameInput, username);
        await this.type(this.passwordInput, password);
        await this.click(this.loginButton);
        await this.waitForPageLoad();
    }

    /**
     * Login with remember me option
     * @param {string} username - Username or email
     * @param {string} password - Password
     * @param {boolean} rememberMe - Whether to check remember me
     */
    async loginWithRememberMe(username, password, rememberMe = true) {
        await this.type(this.usernameInput, username);
        await this.type(this.passwordInput, password);
        
        if (rememberMe) {
            await this.click(this.rememberMeCheckbox);
        }
        
        await this.click(this.loginButton);
        await this.waitForPageLoad();
    }

    /**
     * Get error message text
     * @returns {Promise<string>} Error message
     */
    async getErrorMessage() {
        await this.waitForElement(this.errorMessage);
        return await this.getText(this.errorMessage);
    }

    /**
     * Check if login form is visible
     * @returns {Promise<boolean>} True if form is visible
     */
    async isLoginFormVisible() {
        return await this.isVisible(this.loginForm);
    }

    /**
     * Click forgot password link
     */
    async clickForgotPassword() {
        await this.click(this.forgotPasswordLink);
        await this.waitForPageLoad();
    }

    /**
     * Click sign up link
     */
    async clickSignUp() {
        await this.click(this.signUpLink);
        await this.waitForPageLoad();
    }

    /**
     * Get page title
     * @returns {Promise<string>} Page title text
     */
    async getPageTitle() {
        return await this.getText(this.pageTitle);
    }

    /**
     * Clear login form
     */
    async clearForm() {
        await this.page.fill(this.usernameInput, '');
        await this.page.fill(this.passwordInput, '');
    }

    /**
     * Check if error message is displayed
     * @returns {Promise<boolean>} True if error message is visible
     */
    async isErrorMessageDisplayed() {
        return await this.isVisible(this.errorMessage);
    }

    /**
     * Check if login button is enabled
     * @returns {Promise<boolean>} True if login button is enabled
     */
    async isLoginButtonEnabled() {
        return await this.page.isEnabled(this.loginButton);
    }

    /**
     * Get username input placeholder
     * @returns {Promise<string>} Placeholder text
     */
    async getUsernamePlaceholder() {
        return await this.page.getAttribute(this.usernameInput, 'placeholder');
    }

    /**
     * Get password input placeholder
     * @returns {Promise<string>} Placeholder text
     */
    async getPasswordPlaceholder() {
        return await this.page.getAttribute(this.passwordInput, 'placeholder');
    }
}

module.exports = LoginPage;