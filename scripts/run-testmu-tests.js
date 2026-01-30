#!/usr/bin/env node

/**
 * TestMu AI Local Test Runner
 * Script to run TestMu AI tests locally with proper configuration
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
    baseCommand: 'npx playwright test',
    testFiles: [
        'tests/testmu-simple-form.spec.js',
        'tests/testmu-drag-drop-sliders.spec.js', 
        'tests/testmu-input-form.spec.js'
    ],
    browsers: ['chromium', 'firefox'],
    outputDir: 'test-results',
    reportDir: 'playwright-report'
};

class TestRunner {
    constructor() {
        this.startTime = Date.now();
        this.testResults = [];
    }

    log(message, level = 'INFO') {
        const timestamp = new Date().toISOString();
        const prefix = {
            'INFO': 'ℹ️',
            'SUCCESS': '✅', 
            'ERROR': '❌',
            'WARN': '⚠️',
            'START': '🚀'
        };
        
        console.log(`[${timestamp}] ${prefix[level] || 'ℹ️'} ${message}`);
    }

    async setup() {
        this.log('Setting up test environment...', 'START');
        
        // Create directories
        const dirs = [config.outputDir, config.reportDir, 'screenshots', 'allure-results'];
        dirs.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
                this.log(`Created directory: ${dir}`, 'INFO');
            }
        });

        // Check Playwright installation
        try {
            execSync('npx playwright --version', { stdio: 'pipe' });
            this.log('Playwright is installed', 'SUCCESS');
        } catch (error) {
            this.log('Installing Playwright...', 'WARN');
            execSync('npm install @playwright/test', { stdio: 'inherit' });
        }

        // Install browsers
        try {
            this.log('Installing Playwright browsers...', 'INFO');
            execSync('npx playwright install', { stdio: 'inherit' });
            this.log('Browsers installed successfully', 'SUCCESS');
        } catch (error) {
            this.log(`Browser installation failed: ${error.message}`, 'ERROR');
            throw error;
        }
    }

    async runTest(testFile, browser = 'chromium') {
        return new Promise((resolve, reject) => {
            this.log(`Running ${testFile} on ${browser}...`, 'START');
            
            const args = [
                'playwright', 'test',
                testFile,
                `--project=${browser}`,
                '--reporter=html,json,line',
                `--output-dir=${config.outputDir}`,
                '--headed=false',
                '--screenshot=only-on-failure',
                '--video=retain-on-failure',
                '--trace=retain-on-failure'
            ];

            const testProcess = spawn('npx', args, {
                stdio: ['pipe', 'pipe', 'pipe'],
                env: {
                    ...process.env,
                    TEST_ENV: 'local',
                    TESTMU_BASE_URL: 'https://www.testmu.ai/selenium-playground/',
                    BROWSER_TIMEOUT: '60000',
                    SCREENSHOTS_ENABLED: 'true',
                    CONSOLE_LOGS: 'true'
                }
            });

            let output = '';
            let errorOutput = '';

            testProcess.stdout.on('data', (data) => {
                output += data.toString();
                console.log(data.toString().trim());
            });

            testProcess.stderr.on('data', (data) => {
                errorOutput += data.toString();
                console.error(data.toString().trim());
            });

            testProcess.on('close', (code) => {
                const testResult = {
                    testFile,
                    browser,
                    exitCode: code,
                    status: code === 0 ? 'PASSED' : 'FAILED',
                    output,
                    errorOutput,
                    duration: Date.now() - this.startTime
                };

                this.testResults.push(testResult);

                if (code === 0) {
                    this.log(`✅ ${testFile} (${browser}) - PASSED`, 'SUCCESS');
                    resolve(testResult);
                } else {
                    this.log(`❌ ${testFile} (${browser}) - FAILED (Exit Code: ${code})`, 'ERROR');
                    reject(testResult);
                }
            });

            testProcess.on('error', (error) => {
                this.log(`Process error: ${error.message}`, 'ERROR');
                reject(error);
            });
        });
    }

    async runAllTests() {
        this.log('Starting TestMu AI test execution...', 'START');
        
        const results = [];
        
        for (const testFile of config.testFiles) {
            for (const browser of config.browsers) {
                try {
                    const result = await this.runTest(testFile, browser);
                    results.push(result);
                } catch (error) {
                    this.log(`Test execution failed: ${error}`, 'ERROR');
                    results.push(error);
                }
            }
        }

        return results;
    }

    generateReport() {
        this.log('Generating test execution report...', 'INFO');
        
        const totalTests = this.testResults.length;
        const passedTests = this.testResults.filter(r => r.status === 'PASSED').length;
        const failedTests = totalTests - passedTests;
        const totalDuration = Date.now() - this.startTime;

        const report = {
            summary: {
                totalTests,
                passedTests,
                failedTests,
                passRate: `${((passedTests / totalTests) * 100).toFixed(2)}%`,
                totalDuration: `${totalDuration}ms`,
                timestamp: new Date().toISOString()
            },
            results: this.testResults,
            environment: {
                nodeVersion: process.version,
                platform: process.platform,
                testEnv: 'local'
            }
        };

        // Write report to file
        const reportPath = path.join(config.outputDir, 'test-summary.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

        // Display summary
        console.log('\n' + '='.repeat(50));
        console.log('📊 TEST EXECUTION SUMMARY');
        console.log('='.repeat(50));
        console.log(`Total Tests: ${totalTests}`);
        console.log(`Passed: ${passedTests} ✅`);
        console.log(`Failed: ${failedTests} ❌`);
        console.log(`Pass Rate: ${report.summary.passRate}`);
        console.log(`Duration: ${totalDuration}ms`);
        console.log(`Report: ${reportPath}`);
        console.log('='.repeat(50));

        return report;
    }

    async openReport() {
        const reportPath = path.join(config.reportDir, 'index.html');
        if (fs.existsSync(reportPath)) {
            this.log('Opening HTML report...', 'INFO');
            try {
                execSync(`start ${reportPath}`, { stdio: 'ignore' });
            } catch (error) {
                this.log(`Report path: ${path.resolve(reportPath)}`, 'INFO');
            }
        }
    }
}

// Main execution
async function main() {
    const runner = new TestRunner();
    
    try {
        await runner.setup();
        await runner.runAllTests();
        const report = runner.generateReport();
        await runner.openReport();
        
        // Exit with appropriate code
        const hasFailures = report.summary.failedTests > 0;
        process.exit(hasFailures ? 1 : 0);
        
    } catch (error) {
        runner.log(`Fatal error: ${error.message}`, 'ERROR');
        console.error(error);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = TestRunner;