const fs = require('fs');
const path = require('path');

class TestDataHelper {
    /**
     * Read JSON data from file
     * @param {string} fileName - Name of the JSON file
     * @returns {Object} Parsed JSON data
     */
    static readJsonData(fileName) {
        const filePath = path.join(__dirname, '..', 'testData', fileName);
        const rawData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(rawData);
    }

    /**
     * Get login test data
     * @returns {Object} Login test data
     */
    static getLoginData() {
        return this.readJsonData('loginData.json');
    }

    /**
     * Get general test data
     * @returns {Object} General test data
     */
    static getTestData() {
        return this.readJsonData('testData.json');
    }

    /**
     * Get valid user credentials
     * @param {string} userType - Type of user (default: first valid user)
     * @returns {Object} User credentials
     */
    static getValidUser(userType = 'user') {
        const loginData = this.getLoginData();
        return loginData.validUsers.find(user => user.role === userType) || loginData.validUsers[0];
    }

    /**
     * Get invalid user credentials
     * @param {number} index - Index of invalid user (default: 0)
     * @returns {Object} Invalid user credentials
     */
    static getInvalidUser(index = 0) {
        const loginData = this.getLoginData();
        return loginData.invalidUsers[index];
    }

    /**
     * Get environment configuration
     * @param {string} environment - Environment name (dev, staging, production)
     * @returns {Object} Environment configuration
     */
    static getEnvironment(environment = 'dev') {
        const loginData = this.getLoginData();
        return loginData.testEnvironments[environment];
    }

    /**
     * Generate random email
     * @param {string} domain - Email domain (default: example.com)
     * @returns {string} Random email
     */
    static generateRandomEmail(domain = 'example.com') {
        const randomString = Math.random().toString(36).substring(2, 8);
        return `test.${randomString}@${domain}`;
    }

    /**
     * Generate random string
     * @param {number} length - Length of string (default: 8)
     * @returns {string} Random string
     */
    static generateRandomString(length = 8) {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    /**
     * Generate random number within range
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Random number
     */
    static generateRandomNumber(min = 1, max = 100) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Get current date in specific format
     * @param {string} format - Date format (default: YYYY-MM-DD)
     * @returns {string} Formatted date
     */
    static getCurrentDate(format = 'YYYY-MM-DD') {
        const now = new Date();
        if (format === 'YYYY-MM-DD') {
            return now.toISOString().split('T')[0];
        } else if (format === 'MM/DD/YYYY') {
            return `${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')}/${now.getFullYear()}`;
        } else if (format === 'DD-MM-YYYY') {
            return `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()}`;
        }
        return now.toISOString();
    }

    /**
     * Wait for specific amount of time
     * @param {number} milliseconds - Time to wait
     * @returns {Promise} Promise that resolves after specified time
     */
    static async wait(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    /**
     * Create directory if it doesn't exist
     * @param {string} dirPath - Directory path
     */
    static ensureDirectoryExists(dirPath) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }

    /**
     * Write data to JSON file
     * @param {string} fileName - File name
     * @param {Object} data - Data to write
     */
    static writeJsonData(fileName, data) {
        const filePath = path.join(__dirname, '..', 'testData', fileName);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
}

module.exports = TestDataHelper;