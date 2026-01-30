# Playwright Automation Framework

A comprehensive test automation framework built with Playwright for end-to-end testing of web applications.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/pushpalchakraborti2014/Playwright-pushpal.git
cd Playwright-pushpal
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Project Structure

```
├── tests/                 # Test files
├── pageObjects/           # Page Object Model classes
├── testData/             # Test data files (JSON, CSV, etc.)
├── utils/                # Utility functions and helpers
├── config/               # Configuration files
├── reports/              # Test execution reports
├── screenshots/          # Screenshots for failed tests
├── playwright.config.js  # Playwright configuration
└── package.json          # Project dependencies
```

## Configuration

The framework uses `playwright.config.js` for configuration. You can modify:
- Browser settings
- Test directories
- Reporting options
- Timeouts and retries
- Environment variables

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode
```bash
npm run test:headed
```

### Run tests in specific browser
```bash
npm run test:chrome
npm run test:firefox
npm run test:safari
```

### Run tests with UI mode
```bash
npm run test:ui
```

### Run tests on LambdaTest Cloud
```bash
# Run on LambdaTest Chrome
npm run test:lt-chrome

# Run on LambdaTest Firefox  
npm run test:lt-firefox

# Run on LambdaTest Safari
npm run test:lt-safari

# Run on all LambdaTest browsers
npm run test:lambdatest-all
```

### Generate and view test report
```bash
npm run report
```

## Writing Tests

### Basic Test Structure
```javascript
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

### Using Page Object Model
```javascript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage';

test('login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('username', 'password');
  await expect(page).toHaveURL('/dashboard');
});
```

## Features

- ✅ Cross-browser testing (Chrome, Firefox, Safari, Edge)
- ✅ **LambdaTest Cloud Integration** for scalable testing
- ✅ Page Object Model implementation
- ✅ Data-driven testing support
- ✅ Screenshot capture on test failure
- ✅ HTML test reporting
- ✅ Parallel test execution
- ✅ CI/CD integration ready
- ✅ Custom utility functions
- ✅ Environment-based configuration
- ✅ **Mobile browser testing** on cloud

## Test Data Management

Test data is stored in the `testData/` directory in JSON format:

```json
{
  "validUser": {
    "username": "test@example.com",
    "password": "password123"
  },
  "invalidUser": {
    "username": "invalid@example.com",
    "password": "wrongpassword"
  }
}
```

## LambdaTest Cloud Integration

This framework is integrated with LambdaTest cloud for scalable cross-browser testing.

### Prerequisites
1. LambdaTest account (sign up at https://lambdatest.com)
2. LambdaTest username and access key

### Configuration
Set your LambdaTest credentials as environment variables:
```bash
# Windows
set LT_USERNAME="your-username"
set LT_ACCESS_KEY="your-access-key"

# macOS/Linux
export LT_USERNAME="your-username"
export LT_ACCESS_KEY="your-access-key"
```

Or update the `.env` file:
```bash
LT_USERNAME=your-username
LT_ACCESS_KEY=your-access-key
```

### Available LambdaTest Browsers
- **Chrome** (Windows 10/11)
- **Firefox** (Windows 10)
- **Safari** (macOS Monterey/Ventura)
- **Edge** (Windows 10)
- **Mobile Chrome** (Android)
- **Mobile Safari** (iOS)

### Running Tests on LambdaTest
```bash
# Single browser
npm run test:lt-chrome
npm run test:lt-firefox
npm run test:lt-safari

# All LambdaTest browsers
npm run test:lambdatest-all

# Direct connection tests
npm run test:lt-direct

# Run LambdaTest example script
npm run example:lambdatest

# Specific test file on LambdaTest
npx playwright test tests/login.spec.js --project=lambdatest-chrome
```

### LambdaTest Features
- ✅ **Real browser testing** on cloud
- ✅ **Video recording** of test execution
- ✅ **Network logs** and console logs
- ✅ **Screenshots** for each step
- ✅ **Geolocation testing**
- ✅ **Mobile device testing**
- ✅ **Parallel execution** across multiple browsers
- ✅ **Build and test organization**

## Reporting

Test execution generates:
- HTML reports in `playwright-report/`
- Screenshots for failed tests in `test-results/`
- Trace files for debugging

## CI/CD Integration

The framework is configured for CI/CD pipelines. Example GitHub Actions workflow:

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: 18
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npm run test
    - uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

## Best Practices

1. **Page Object Model**: Organize page elements and actions in separate classes
2. **Test Data Separation**: Keep test data in external files
3. **Assertions**: Use Playwright's built-in assertions for better error messages
4. **Waiting Strategies**: Use auto-waiting features and explicit waits when needed
5. **Test Independence**: Ensure tests can run independently and in any order
6. **Clean Code**: Follow naming conventions and add meaningful comments

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact [pushpalchakraborti2014@gmail.com](mailto:pushpalchakraborti2014@gmail.com)