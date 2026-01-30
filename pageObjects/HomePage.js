const BasePage = require('./BasePage');

class HomePage extends BasePage {
    constructor(page) {
        super(page);
        
        // Page locators
        this.header = '.header';
        this.navigation = '.nav-menu';
        this.logo = '.logo';
        this.userProfile = '.user-profile';
        this.logoutButton = '#logout';
        this.searchBox = '#search';
        this.searchButton = '#search-btn';
        this.mainContent = '.main-content';
        this.footer = '.footer';
        this.welcomeMessage = '.welcome-message';
        this.notifications = '.notifications';
        this.sidebar = '.sidebar';
        this.menuToggle = '.menu-toggle';
    }

    /**
     * Navigate to home page
     * @param {string} url - Home page URL
     */
    async goto(url = '/') {
        await super.goto(url);
        await this.waitForPageLoad();
    }

    /**
     * Check if user is logged in
     * @returns {Promise<boolean>} True if user profile is visible
     */
    async isUserLoggedIn() {
        return await this.isVisible(this.userProfile);
    }

    /**
     * Get welcome message
     * @returns {Promise<string>} Welcome message text
     */
    async getWelcomeMessage() {
        await this.waitForElement(this.welcomeMessage);
        return await this.getText(this.welcomeMessage);
    }

    /**
     * Perform logout
     */
    async logout() {
        await this.click(this.userProfile);
        await this.click(this.logoutButton);
        await this.waitForPageLoad();
    }

    /**
     * Search for content
     * @param {string} searchTerm - Term to search for
     */
    async search(searchTerm) {
        await this.type(this.searchBox, searchTerm);
        await this.click(this.searchButton);
        await this.waitForPageLoad();
    }

    /**
     * Check if header is visible
     * @returns {Promise<boolean>} True if header is visible
     */
    async isHeaderVisible() {
        return await this.isVisible(this.header);
    }

    /**
     * Check if footer is visible
     * @returns {Promise<boolean>} True if footer is visible
     */
    async isFooterVisible() {
        return await this.isVisible(this.footer);
    }

    /**
     * Click on logo
     */
    async clickLogo() {
        await this.click(this.logo);
        await this.waitForPageLoad();
    }

    /**
     * Toggle mobile menu
     */
    async toggleMobileMenu() {
        await this.click(this.menuToggle);
        await this.wait(500); // Wait for animation
    }

    /**
     * Check if sidebar is visible
     * @returns {Promise<boolean>} True if sidebar is visible
     */
    async isSidebarVisible() {
        return await this.isVisible(this.sidebar);
    }

    /**
     * Get notifications count
     * @returns {Promise<number>} Number of notifications
     */
    async getNotificationsCount() {
        if (await this.isVisible(this.notifications)) {
            const notificationElements = await this.page.locator(`${this.notifications} .notification-item`).count();
            return notificationElements;
        }
        return 0;
    }

    /**
     * Navigate to specific section
     * @param {string} sectionName - Name of the section to navigate to
     */
    async navigateToSection(sectionName) {
        const sectionSelector = `${this.navigation} a[href*="${sectionName.toLowerCase()}"]`;
        await this.click(sectionSelector);
        await this.waitForPageLoad();
    }

    /**
     * Check if main content is loaded
     * @returns {Promise<boolean>} True if main content is visible
     */
    async isMainContentLoaded() {
        return await this.isVisible(this.mainContent);
    }
}

module.exports = HomePage;