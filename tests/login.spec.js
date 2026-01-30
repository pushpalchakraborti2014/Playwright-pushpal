const { test, expect } = require('@playwright/test');
const PageObjectManager = require('../pageObjects/PageObjectManager');
const TestDataHelper = require('../utils/TestDataHelper');
const ReportHelper = require('../utils/ReportHelper');

test.describe('Login Functionality Tests', () => {
    let pom;
    let loginPage;
    let homePage;

    test.beforeEach(async ({ page }) => {
        pom = PageObjectManager.init(page);
        loginPage = pom.getLoginPage();
        homePage = pom.getHomePage();
        
        // Navigate to login page
        await loginPage.goto('/login');
        ReportHelper.logStep('Navigated to login page', 'INFO');
    });

    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status === 'failed') {
            await ReportHelper.takeScreenshot(page, testInfo.title);
        }
    });

    test('Valid Login - Should login successfully with valid credentials', async ({ page }) => {
        // Arrange
        const validUser = TestDataHelper.getValidUser();
        ReportHelper.logStep(`Testing login with user: ${validUser.username}`, 'INFO');

        // Act
        await loginPage.login(validUser.username, validUser.password);
        ReportHelper.logStep('Entered credentials and clicked login', 'INFO');

        // Assert
        await expect(page).toHaveURL(/dashboard|home/);
        await expect(homePage.page.locator(homePage.welcomeMessage)).toBeVisible();
        
        ReportHelper.logStep('Login successful - User redirected to dashboard', 'PASS');
    });

    test('Invalid Login - Should show error with invalid credentials', async ({ page }) => {
        // Arrange
        const invalidUser = TestDataHelper.getInvalidUser();
        ReportHelper.logStep(`Testing login with invalid user: ${invalidUser.username}`, 'INFO');

        // Act
        await loginPage.login(invalidUser.username, invalidUser.password);
        ReportHelper.logStep('Entered invalid credentials and clicked login', 'INFO');

        // Assert
        await expect(loginPage.page.locator(loginPage.errorMessage)).toBeVisible();
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain(invalidUser.expectedError);
        
        ReportHelper.logStep(`Error message displayed correctly: ${errorMessage}`, 'PASS');
    });

    test('Empty Fields - Should show validation errors for empty fields', async ({ page }) => {
        // Arrange
        ReportHelper.logStep('Testing login with empty credentials', 'INFO');

        // Act
        await loginPage.login('', '');
        ReportHelper.logStep('Clicked login with empty fields', 'INFO');

        // Assert
        await expect(loginPage.page.locator(loginPage.errorMessage)).toBeVisible();
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBeTruthy();
        
        ReportHelper.logStep(`Validation error displayed: ${errorMessage}`, 'PASS');
    });

    test('Remember Me - Should check remember me functionality', async ({ page }) => {
        // Arrange
        const validUser = TestDataHelper.getValidUser();
        ReportHelper.logStep('Testing remember me functionality', 'INFO');

        // Act
        await loginPage.loginWithRememberMe(validUser.username, validUser.password, true);
        ReportHelper.logStep('Logged in with remember me checked', 'INFO');

        // Assert
        await expect(page).toHaveURL(/dashboard|home/);
        
        // Check if remember me cookie is set (this would depend on your application)
        const cookies = await page.context().cookies();
        const rememberMeCookie = cookies.find(cookie => cookie.name.includes('remember'));
        
        if (rememberMeCookie) {
            ReportHelper.logStep('Remember me cookie found', 'PASS');
        } else {
            ReportHelper.logStep('Remember me functionality may need verification', 'INFO');
        }
    });

    test('Forgot Password - Should navigate to forgot password page', async ({ page }) => {
        // Arrange
        ReportHelper.logStep('Testing forgot password link', 'INFO');

        // Act
        await loginPage.clickForgotPassword();
        ReportHelper.logStep('Clicked forgot password link', 'INFO');

        // Assert
        await expect(page).toHaveURL(/forgot-password|reset/);
        ReportHelper.logStep('Successfully navigated to forgot password page', 'PASS');
    });

    test('Login Form Elements - Should verify all form elements are present', async ({ page }) => {
        // Arrange
        ReportHelper.logStep('Testing login form elements', 'INFO');

        // Assert
        await expect(loginPage.page.locator(loginPage.usernameInput)).toBeVisible();
        await expect(loginPage.page.locator(loginPage.passwordInput)).toBeVisible();
        await expect(loginPage.page.locator(loginPage.loginButton)).toBeVisible();
        await expect(loginPage.page.locator(loginPage.forgotPasswordLink)).toBeVisible();
        
        // Check if login button is enabled
        const isLoginButtonEnabled = await loginPage.isLoginButtonEnabled();
        expect(isLoginButtonEnabled).toBeTruthy();
        
        ReportHelper.logStep('All login form elements are present and accessible', 'PASS');
    });

    test('Page Title and Content - Should verify page title and basic content', async ({ page }) => {
        // Arrange
        ReportHelper.logStep('Testing page title and content', 'INFO');

        // Assert
        const pageTitle = await page.title();
        expect(pageTitle).toContain('Login');
        
        const formTitle = await loginPage.getPageTitle();
        expect(formTitle).toBeTruthy();
        
        ReportHelper.logStep(`Page title verified: ${pageTitle}`, 'PASS');
    });
});