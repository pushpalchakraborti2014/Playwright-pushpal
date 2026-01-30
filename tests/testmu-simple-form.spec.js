const { test, expect } = require('@playwright/test');
const { TestMuPlaygroundPage } = require('../pageObjects/TestMuPlaygroundPage');
const { SimpleFormDemoPage } = require('../pageObjects/SimpleFormDemoPage');
const testData = require('../testData/testMuTestData.json');
const config = require('../config/testmu-config');
const TestMuUtils = require('../utils/testmu-utils');

test.describe('TestMu AI - Simple Form Demo Tests', () => {
    let playgroundPage;
    let simpleFormPage;
    let testContext;

    test.beforeEach(async ({ page }, testInfo) => {
        // Create test context
        testContext = TestMuUtils.createTestContext(testInfo);
        TestMuUtils.logTestStep(`Starting test: ${testContext.testName}`, 'START');

        // Initialize page objects
        playgroundPage = new TestMuPlaygroundPage(page);
        simpleFormPage = new SimpleFormDemoPage(page);

        // Set up error handling
        page.on('console', msg => {
            if (msg.type() === 'error') {
                TestMuUtils.logTestStep(`Console Error: ${msg.text()}`, 'WARN');
            }
        });

        // Handle dialogs
        TestMuUtils.handleDialog(page, 'accept');
    });

    test('Test Scenario 1: Simple Form Demo Validation', async ({ page }, testInfo) => {
        try {
            // Step 1: Open TestMu AI Selenium Playground
            TestMuUtils.logTestStep('Navigating to TestMu AI Selenium Playground', 'INFO');
            await playgroundPage.navigateToPlayground();
            await TestMuUtils.waitForNetworkIdle(page);

            // Take screenshot after loading
            await TestMuUtils.takeScreenshot(page, 'playground-loaded');

            // Step 2: Click "Simple Form Demo"
            TestMuUtils.logTestStep('Clicking Simple Form Demo link', 'INFO');
            await playgroundPage.clickSimpleFormDemo();
            await TestMuUtils.waitForNetworkIdle(page);

            // Step 3: Validate that the URL contains "simple-form-demo"
            TestMuUtils.logTestStep('Validating URL contains simple-form-demo', 'INFO');
            const isURLValid = await TestMuUtils.validateURL(page, testData.simpleFormDemo.expectedURL);
            expect(isURLValid, 'URL should contain "simple-form-demo"').toBeTruthy();

            // Step 4 & 5: Create a variable for a string value and use it to enter values
            const testMessage = config.TESTMU_FORM_MESSAGE || testData.simpleFormDemo.testMessage;
            TestMuUtils.logTestStep(`Entering test message: "${testMessage}"`, 'INFO');
            await simpleFormPage.enterMessage(testMessage);

            // Take screenshot after entering message
            await TestMuUtils.takeScreenshot(page, 'message-entered');

            // Step 6: Click "Get Checked Value"
            TestMuUtils.logTestStep('Clicking Get Checked Value button', 'INFO');
            await simpleFormPage.clickGetCheckedValue();
            
            // Wait for message to be displayed
            await page.waitForTimeout(1000);

            // Step 7: Validate whether the same text message is displayed
            TestMuUtils.logTestStep('Validating displayed message matches input', 'INFO');
            const isMessageDisplayed = await simpleFormPage.validateDisplayedMessage(testMessage);
            expect(isMessageDisplayed, 'Display message should contain the input message').toBeTruthy();

            // Additional assertion for exact match
            const displayedMessage = await simpleFormPage.getDisplayedMessage();
            expect(displayedMessage, 'Displayed message should match input exactly').toContain(testMessage);

            // Take final screenshot
            await TestMuUtils.takeScreenshot(page, 'test-completed');

            TestMuUtils.logTestStep('Simple Form Demo test completed successfully', 'PASS');

        } catch (error) {
            TestMuUtils.logTestStep(`Test failed: ${error.message}`, 'FAIL');
            
            // Take screenshot on failure
            await TestMuUtils.takeScreenshot(page, 'test-failed');
            
            // Generate test report
            const report = TestMuUtils.generateTestReport(
                testContext.testName,
                'FAILED',
                {
                    duration: Date.now() - testContext.startTime,
                    errors: [error.message],
                    screenshots: [`test-failed-${TestMuUtils.getTimestamp()}.png`]
                }
            );
            
            TestMuUtils.logTestStep(`Test report generated: ${JSON.stringify(report, null, 2)}`, 'INFO');
            
            throw error;
        }
    });

    test.afterEach(async ({ page }, testInfo) => {
        const duration = Date.now() - testContext.startTime;
        const status = testInfo.status === 'passed' ? 'PASSED' : 'FAILED';
        
        TestMuUtils.logTestStep(`Test ${status} in ${duration}ms`, status === 'PASSED' ? 'PASS' : 'FAIL');
        
        // Generate final test report
        const report = TestMuUtils.generateTestReport(
            testContext.testName,
            status,
            { duration }
        );
        
        if (config.FILE_LOGS) {
            // Log report to file (implement file logging if needed)
            TestMuUtils.logTestStep('Test report logged to file', 'INFO');
        }
    });
});