const LoginPage = require('./LoginPage');
const HomePage = require('./HomePage');

class PageObjectManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.homePage = new HomePage(page);
    }

    /**
     * Get Login Page instance
     * @returns {LoginPage} Login page object
     */
    getLoginPage() {
        return this.loginPage;
    }

    /**
     * Get Home Page instance
     * @returns {HomePage} Home page object
     */
    getHomePage() {
        return this.homePage;
    }

    /**
     * Initialize all page objects
     * @param {Page} page - Playwright page object
     * @returns {PageObjectManager} Page object manager instance
     */
    static init(page) {
        return new PageObjectManager(page);
    }
}

module.exports = PageObjectManager;