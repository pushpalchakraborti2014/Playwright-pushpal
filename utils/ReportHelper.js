const fs = require('fs');
const path = require('path');

class ReportHelper {
    /**
     * Take screenshot with timestamp
     * @param {Page} page - Playwright page object
     * @param {string} testName - Name of the test
     * @returns {string} Screenshot file path
     */
    static async takeScreenshot(page, testName) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const screenshotDir = path.join(__dirname, '..', 'screenshots');
        
        // Ensure screenshots directory exists
        if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir, { recursive: true });
        }
        
        const fileName = `${testName}-${timestamp}.png`;
        const filePath = path.join(screenshotDir, fileName);
        
        await page.screenshot({ 
            path: filePath, 
            fullPage: true 
        });
        
        return filePath;
    }

    /**
     * Log test step
     * @param {string} step - Test step description
     * @param {string} status - Status (PASS, FAIL, INFO)
     */
    static logStep(step, status = 'INFO') {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] [${status}] ${step}`);
    }

    /**
     * Create test report entry
     * @param {Object} testInfo - Test information
     * @param {string} status - Test status
     * @param {string} error - Error message (if any)
     * @returns {Object} Report entry
     */
    static createReportEntry(testInfo, status, error = null) {
        return {
            testName: testInfo.title,
            status: status,
            duration: testInfo.duration || 0,
            timestamp: new Date().toISOString(),
            error: error,
            browser: testInfo.project?.name || 'Unknown'
        };
    }

    /**
     * Save custom test report
     * @param {Array} reportData - Array of report entries
     * @param {string} fileName - Report file name
     */
    static saveCustomReport(reportData, fileName = 'custom-report.json') {
        const reportsDir = path.join(__dirname, '..', 'reports');
        
        // Ensure reports directory exists
        if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, { recursive: true });
        }
        
        const filePath = path.join(reportsDir, fileName);
        const reportJson = {
            summary: {
                total: reportData.length,
                passed: reportData.filter(test => test.status === 'PASS').length,
                failed: reportData.filter(test => test.status === 'FAIL').length,
                skipped: reportData.filter(test => test.status === 'SKIP').length,
                generatedAt: new Date().toISOString()
            },
            tests: reportData
        };
        
        fs.writeFileSync(filePath, JSON.stringify(reportJson, null, 2));
        console.log(`Custom report saved: ${filePath}`);
    }

    /**
     * Generate HTML report
     * @param {Array} reportData - Array of report entries
     * @param {string} fileName - HTML file name
     */
    static generateHtmlReport(reportData, fileName = 'test-report.html') {
        const reportsDir = path.join(__dirname, '..', 'reports');
        
        // Ensure reports directory exists
        if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, { recursive: true });
        }
        
        const total = reportData.length;
        const passed = reportData.filter(test => test.status === 'PASS').length;
        const failed = reportData.filter(test => test.status === 'FAIL').length;
        const skipped = reportData.filter(test => test.status === 'SKIP').length;
        
        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Playwright Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background: #f5f5f5; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
        .summary { display: flex; gap: 20px; margin-bottom: 20px; }
        .stat { padding: 10px; border-radius: 5px; text-align: center; min-width: 100px; }
        .total { background: #e7f3ff; }
        .passed { background: #d4edda; }
        .failed { background: #f8d7da; }
        .skipped { background: #fff3cd; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background: #f2f2f2; }
        .status-PASS { color: green; font-weight: bold; }
        .status-FAIL { color: red; font-weight: bold; }
        .status-SKIP { color: orange; font-weight: bold; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Playwright Test Report</h1>
        <p>Generated on: ${new Date().toISOString()}</p>
    </div>
    
    <div class="summary">
        <div class="stat total">
            <div style="font-size: 24px;">${total}</div>
            <div>Total</div>
        </div>
        <div class="stat passed">
            <div style="font-size: 24px;">${passed}</div>
            <div>Passed</div>
        </div>
        <div class="stat failed">
            <div style="font-size: 24px;">${failed}</div>
            <div>Failed</div>
        </div>
        <div class="stat skipped">
            <div style="font-size: 24px;">${skipped}</div>
            <div>Skipped</div>
        </div>
    </div>
    
    <table>
        <thead>
            <tr>
                <th>Test Name</th>
                <th>Status</th>
                <th>Browser</th>
                <th>Duration (ms)</th>
                <th>Timestamp</th>
                <th>Error</th>
            </tr>
        </thead>
        <tbody>
            ${reportData.map(test => `
                <tr>
                    <td>${test.testName}</td>
                    <td class="status-${test.status}">${test.status}</td>
                    <td>${test.browser}</td>
                    <td>${test.duration}</td>
                    <td>${new Date(test.timestamp).toLocaleString()}</td>
                    <td>${test.error || '-'}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>
</body>
</html>`;
        
        const filePath = path.join(reportsDir, fileName);
        fs.writeFileSync(filePath, htmlContent);
        console.log(`HTML report generated: ${filePath}`);
    }

    /**
     * Log performance metrics
     * @param {Page} page - Playwright page object
     * @param {string} testName - Test name
     */
    static async logPerformanceMetrics(page, testName) {
        try {
            const metrics = await page.evaluate(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                return {
                    loadTime: navigation.loadEventEnd - navigation.loadEventStart,
                    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                    firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime,
                    firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime
                };
            });
            
            console.log(`Performance metrics for ${testName}:`, metrics);
            return metrics;
        } catch (error) {
            console.log(`Could not collect performance metrics: ${error.message}`);
            return null;
        }
    }
}

module.exports = ReportHelper;