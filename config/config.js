module.exports = {
    // Environment configurations
    environments: {
        dev: {
            baseUrl: 'https://dev.example.com',
            apiUrl: 'https://api-dev.example.com',
            timeout: 30000
        },
        staging: {
            baseUrl: 'https://staging.example.com',
            apiUrl: 'https://api-staging.example.com',
            timeout: 30000
        },
        production: {
            baseUrl: 'https://example.com',
            apiUrl: 'https://api.example.com',
            timeout: 60000
        }
    },

    // Browser configurations
    browsers: {
        chromium: {
            headless: true,
            viewport: { width: 1920, height: 1080 },
            ignoreHTTPSErrors: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        },
        firefox: {
            headless: true,
            viewport: { width: 1920, height: 1080 },
            ignoreHTTPSErrors: true
        },
        webkit: {
            headless: true,
            viewport: { width: 1920, height: 1080 },
            ignoreHTTPSErrors: true
        }
    },

    // Test timeouts
    timeouts: {
        test: 60000,
        action: 30000,
        navigation: 30000,
        expect: 10000
    },

    // Retry configuration
    retries: {
        ci: 2,
        local: 0
    },

    // Reporting configuration
    reporting: {
        html: true,
        json: true,
        junit: true,
        allure: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry'
    },

    // Test execution settings
    execution: {
        parallel: true,
        workers: process.env.CI ? 1 : undefined,
        fullyParallel: true
    },

    // Custom settings
    custom: {
        screenshotDir: './screenshots',
        downloadDir: './downloads',
        uploadDir: './uploads'
    },

    // API testing configuration
    api: {
        timeout: 30000,
        retries: 3,
        baseHeaders: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    },

    // Database configuration (if needed)
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        username: process.env.DB_USER || 'test',
        password: process.env.DB_PASS || 'password',
        database: process.env.DB_NAME || 'testdb'
    }
};