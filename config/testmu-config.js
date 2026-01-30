// Environment Configuration for TestMu AI Automation
module.exports = {
    // Base URLs
    TESTMU_BASE_URL: process.env.TESTMU_BASE_URL || 'https://www.testmu.ai/selenium-playground/',
    
    // Test Environment
    TEST_ENV: process.env.TEST_ENV || 'local',
    NODE_ENV: process.env.NODE_ENV || 'test',
    
    // Browser Configuration
    DEFAULT_BROWSER: process.env.DEFAULT_BROWSER || 'chromium',
    HEADLESS_MODE: process.env.HEADLESS_MODE === 'true',
    BROWSER_TIMEOUT: parseInt(process.env.BROWSER_TIMEOUT) || 60000,
    
    // Test Configuration
    TEST_TIMEOUT: parseInt(process.env.TEST_TIMEOUT) || 120000,
    ACTION_TIMEOUT: parseInt(process.env.ACTION_TIMEOUT) || 30000,
    NAVIGATION_TIMEOUT: parseInt(process.env.NAVIGATION_TIMEOUT) || 30000,
    
    // LambdaTest Configuration
    LT_USERNAME: process.env.LT_USERNAME,
    LT_ACCESS_KEY: process.env.LT_ACCESS_KEY,
    LT_BUILD_NAME: process.env.LT_BUILD_NAME || 'TestMu-AI-HyperExecute',
    LT_PROJECT_NAME: process.env.LT_PROJECT_NAME || 'TestMu AI Automation',
    
    // HyperExecute Configuration
    HYPEREXECUTE_ENABLED: process.env.HYPEREXECUTE_ENABLED === 'true',
    CONCURRENCY: parseInt(process.env.CONCURRENCY) || 2,
    
    // Artifacts Configuration
    ARTIFACTS_ENABLED: process.env.ARTIFACTS_ENABLED === 'true',
    SCREENSHOTS_ENABLED: process.env.SCREENSHOTS_ENABLED !== 'false',
    VIDEO_RECORDING: process.env.VIDEO_RECORDING !== 'false',
    TRACES_ENABLED: process.env.TRACES_ENABLED !== 'false',
    
    // Report Configuration
    GENERATE_REPORTS: process.env.GENERATE_REPORTS !== 'false',
    HTML_REPORT_DIR: process.env.HTML_REPORT_DIR || 'playwright-report',
    ALLURE_RESULTS_DIR: process.env.ALLURE_RESULTS_DIR || 'allure-results',
    ALLURE_REPORT_DIR: process.env.ALLURE_REPORT_DIR || 'allure-report',
    
    // Retry Configuration
    MAX_RETRIES: parseInt(process.env.MAX_RETRIES) || 2,
    RETRY_ON_FAILURE: process.env.RETRY_ON_FAILURE !== 'false',
    
    // Notification Configuration
    NOTIFICATION_WEBHOOK: process.env.NOTIFICATION_WEBHOOK,
    SLACK_WEBHOOK: process.env.SLACK_WEBHOOK,
    TEAMS_WEBHOOK: process.env.TEAMS_WEBHOOK,
    
    // GitHub Configuration
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    GITHUB_RUN_ID: process.env.GITHUB_RUN_ID,
    GITHUB_ACTOR: process.env.GITHUB_ACTOR,
    GITHUB_EVENT_NAME: process.env.GITHUB_EVENT_NAME,
    
    // Test Data Configuration
    TEST_DATA_DIR: process.env.TEST_DATA_DIR || 'testData',
    DYNAMIC_TEST_DATA: process.env.DYNAMIC_TEST_DATA === 'true',
    
    // Logging Configuration
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    CONSOLE_LOGS: process.env.CONSOLE_LOGS !== 'false',
    FILE_LOGS: process.env.FILE_LOGS === 'true',
    
    // Performance Configuration
    SLOW_MOTION: parseInt(process.env.SLOW_MOTION) || 0,
    WORKERS: parseInt(process.env.WORKERS) || 1,
    FULLY_PARALLEL: process.env.FULLY_PARALLEL !== 'false',
    
    // Security Configuration
    IGNORE_HTTPS_ERRORS: process.env.IGNORE_HTTPS_ERRORS === 'true',
    BYPASS_CSP: process.env.BYPASS_CSP === 'true',
    
    // Network Configuration  
    NETWORK_IDLE_TIMEOUT: parseInt(process.env.NETWORK_IDLE_TIMEOUT) || 30000,
    LOAD_STATE: process.env.LOAD_STATE || 'networkidle',
    
    // Matrix Configuration (for HyperExecute)
    MATRIX_OS: process.env.MATRIX_OS || 'win',
    MATRIX_BROWSER: process.env.MATRIX_BROWSER || 'chrome',
    
    // Custom Test Configuration
    TESTMU_FORM_MESSAGE: process.env.TESTMU_FORM_MESSAGE || 'Welcome to TestMu AI',
    SLIDER_TARGET_VALUE: parseInt(process.env.SLIDER_TARGET_VALUE) || 95,
    FORM_COUNTRY: process.env.FORM_COUNTRY || 'United States',
    
    // Validation Messages
    EXPECTED_ERROR_MESSAGE: process.env.EXPECTED_ERROR_MESSAGE || 'Please fill in this field.',
    EXPECTED_SUCCESS_MESSAGE: process.env.EXPECTED_SUCCESS_MESSAGE || 'Thanks for contacting us, we will get back to you shortly.',
    
    // Feature Flags
    ENABLE_FORM_TESTS: process.env.ENABLE_FORM_TESTS !== 'false',
    ENABLE_SLIDER_TESTS: process.env.ENABLE_SLIDER_TESTS !== 'false',
    ENABLE_INPUT_FORM_TESTS: process.env.ENABLE_INPUT_FORM_TESTS !== 'false',
    
    // Test Execution Tags
    TEST_TAGS: process.env.TEST_TAGS ? process.env.TEST_TAGS.split(',') : [],
    EXCLUDE_TAGS: process.env.EXCLUDE_TAGS ? process.env.EXCLUDE_TAGS.split(',') : [],
};