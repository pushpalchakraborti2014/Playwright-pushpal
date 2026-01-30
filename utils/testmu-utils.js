const config = require('../config/testmu-config');

/**
 * TestMu AI Test Utilities
 * Helper functions for TestMu AI automation tests
 */
class TestMuUtils {
    
    /**
     * Generate timestamp for test artifacts
     * @returns {string} Formatted timestamp
     */
    static getTimestamp() {
        return new Date().toISOString().replace(/[:.]/g, '-');
    }

    /**
     * Generate unique test identifier
     * @param {string} testName - Name of the test
     * @returns {string} Unique test ID
     */
    static generateTestId(testName) {
        const timestamp = this.getTimestamp();
        const randomId = Math.random().toString(36).substring(2, 8);
        return `${testName}-${timestamp}-${randomId}`;
    }

    /**
     * Wait for element with retry logic
     * @param {Object} page - Playwright page object
     * @param {string} selector - Element selector
     * @param {Object} options - Wait options
     */
    static async waitForElementWithRetry(page, selector, options = {}) {
        const maxRetries = options.retries || 3;
        const timeout = options.timeout || config.ACTION_TIMEOUT;
        
        for (let i = 0; i < maxRetries; i++) {
            try {
                await page.waitForSelector(selector, { 
                    state: 'visible', 
                    timeout: timeout 
                });
                return;
            } catch (error) {
                if (i === maxRetries - 1) {
                    throw new Error(`Element ${selector} not found after ${maxRetries} retries: ${error.message}`);
                }
                await page.waitForTimeout(1000);
            }
        }
    }

    /**
     * Take screenshot with timestamp
     * @param {Object} page - Playwright page object
     * @param {string} testName - Name of the test
     */
    static async takeScreenshot(page, testName) {
        if (!config.SCREENSHOTS_ENABLED) return;
        
        const timestamp = this.getTimestamp();
        const filename = `${testName}-${timestamp}.png`;
        const path = `screenshots/${filename}`;
        
        await page.screenshot({ 
            path: path, 
            fullPage: true 
        });
        
        return path;
    }

    /**
     * Log test step with formatting
     * @param {string} stepDescription - Description of the test step
     * @param {string} status - Status (START, PASS, FAIL, INFO)
     */
    static logTestStep(stepDescription, status = 'INFO') {
        if (!config.CONSOLE_LOGS) return;
        
        const timestamp = new Date().toISOString();
        const statusIcon = {
            'START': '🚀',
            'PASS': '✅', 
            'FAIL': '❌',
            'INFO': 'ℹ️',
            'WARN': '⚠️'
        };
        
        console.log(`[${timestamp}] ${statusIcon[status] || 'ℹ️'} ${status}: ${stepDescription}`);
    }

    /**
     * Validate URL contains expected text
     * @param {Object} page - Playwright page object
     * @param {string} expectedText - Expected text in URL
     * @returns {boolean} True if URL contains expected text
     */
    static async validateURL(page, expectedText) {
        const currentURL = page.url();
        const isValid = currentURL.includes(expectedText);
        
        this.logTestStep(`Validating URL contains: ${expectedText}`, isValid ? 'PASS' : 'FAIL');
        this.logTestStep(`Current URL: ${currentURL}`, 'INFO');
        
        return isValid;
    }

    /**
     * Generate test report data
     * @param {string} testName - Name of the test
     * @param {string} status - Test status
     * @param {Object} details - Test execution details
     * @returns {Object} Test report data
     */
    static generateTestReport(testName, status, details = {}) {
        return {
            testName: testName,
            status: status,
            timestamp: new Date().toISOString(),
            environment: config.TEST_ENV,
            browser: config.MATRIX_BROWSER || config.DEFAULT_BROWSER,
            os: config.MATRIX_OS || 'local',
            duration: details.duration || 0,
            screenshots: details.screenshots || [],
            videos: details.videos || [],
            traces: details.traces || [],
            errors: details.errors || [],
            metadata: {
                buildName: config.LT_BUILD_NAME,
                projectName: config.LT_PROJECT_NAME,
                hyperExecute: config.HYPEREXECUTE_ENABLED,
                githubRunId: config.GITHUB_RUN_ID,
                actor: config.GITHUB_ACTOR
            }
        };
    }

    /**
     * Slider value calculation helper
     * @param {number} targetValue - Target slider value (0-100)
     * @param {Object} sliderBox - Slider bounding box
     * @returns {number} Calculated X position
     */
    static calculateSliderPosition(targetValue, sliderBox) {
        if (!sliderBox) {
            throw new Error('Slider bounding box is required');
        }
        
        // Ensure target value is within valid range
        const clampedValue = Math.max(0, Math.min(100, targetValue));
        const percentage = clampedValue / 100;
        const targetX = sliderBox.x + (sliderBox.width * percentage);
        
        this.logTestStep(`Calculating slider position for value: ${clampedValue}%`, 'INFO');
        
        return targetX;
    }

    /**
     * Form field validation helper
     * @param {Object} formData - Form data object
     * @returns {Object} Validation result
     */
    static validateFormData(formData) {
        const errors = [];
        const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
        
        requiredFields.forEach(field => {
            if (!formData[field] || formData[field].trim() === '') {
                errors.push(`${field} is required`);
            }
        });

        // Email validation
        if (formData.email && !this.isValidEmail(formData.email)) {
            errors.push('Invalid email format');
        }

        // Phone validation
        if (formData.phone && !this.isValidPhone(formData.phone)) {
            errors.push('Invalid phone format');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Email validation
     * @param {string} email - Email address
     * @returns {boolean} True if valid email
     */
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Phone validation
     * @param {string} phone - Phone number
     * @returns {boolean} True if valid phone
     */
    static isValidPhone(phone) {
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }

    /**
     * Wait for network to be idle
     * @param {Object} page - Playwright page object
     * @param {number} timeout - Timeout in milliseconds
     */
    static async waitForNetworkIdle(page, timeout = config.NETWORK_IDLE_TIMEOUT) {
        await page.waitForLoadState('networkidle', { timeout });
    }

    /**
     * Handle popup dialogs
     * @param {Object} page - Playwright page object
     * @param {string} action - Action to take (accept/dismiss)
     */
    static async handleDialog(page, action = 'accept') {
        page.on('dialog', async dialog => {
            this.logTestStep(`Dialog appeared: ${dialog.message()}`, 'INFO');
            if (action === 'accept') {
                await dialog.accept();
            } else {
                await dialog.dismiss();
            }
        });
    }

    /**
     * Generate random test data
     * @param {string} type - Type of data to generate
     * @returns {string} Generated test data
     */
    static generateRandomData(type) {
        const generators = {
            email: () => `test.${Math.random().toString(36).substring(2, 8)}@testmu.ai`,
            phone: () => `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
            text: (length = 10) => Math.random().toString(36).substring(2, length + 2),
            number: (min = 1, max = 100) => Math.floor(Math.random() * (max - min + 1)) + min
        };

        return generators[type] ? generators[type]() : `test-${Math.random().toString(36).substring(2, 8)}`;
    }

    /**
     * Create test execution context
     * @param {Object} testInfo - Playwright test info
     * @returns {Object} Test context
     */
    static createTestContext(testInfo) {
        return {
            testId: this.generateTestId(testInfo.title),
            testName: testInfo.title,
            projectName: testInfo.project.name,
            startTime: Date.now(),
            config: {
                environment: config.TEST_ENV,
                browser: config.MATRIX_BROWSER || config.DEFAULT_BROWSER,
                os: config.MATRIX_OS,
                hyperExecute: config.HYPEREXECUTE_ENABLED
            }
        };
    }
}

module.exports = TestMuUtils;