# TestMu AI Automation with HyperExecute

This project contains automated tests for TestMu AI Selenium Playground using Playwright and HyperExecute cloud grid.

## 🎯 Test Scenarios

### Test Scenario 1: Simple Form Demo
- Opens TestMu AI Selenium Playground
- Clicks "Simple Form Demo"
- Validates URL contains "simple-form-demo"
- Enters test message and validates output

### Test Scenario 2: Drag & Drop Sliders  
- Opens TestMu AI Selenium Playground
- Clicks "Drag & Drop Sliders"
- Drags slider from default value 15 to 95
- Validates the range value shows 95

### Test Scenario 3: Input Form Submit
- Opens TestMu AI Selenium Playground
- Clicks "Input Form Submit"
- Tests form validation (empty submission)
- Fills complete form including country selection
- Validates success message

## 🏗️ Project Structure

```
├── .github/workflows/
│   └── hyperexecute-testmu.yml     # GitHub Actions workflow
├── pageObjects/
│   ├── TestMuPlaygroundPage.js     # Main playground page
│   ├── SimpleFormDemoPage.js       # Simple form demo page
│   ├── DragDropSlidersPage.js      # Drag & drop sliders page
│   └── InputFormSubmitPage.js      # Input form submit page
├── tests/
│   ├── testmu-simple-form.spec.js  # Test Scenario 1
│   ├── testmu-drag-drop-sliders.spec.js # Test Scenario 2
│   └── testmu-input-form.spec.js   # Test Scenario 3
├── testData/
│   ├── testMuTestData.json         # Test data for scenarios
│   └── inputFormTestData.json      # Form submission test data
├── hyperexecute.yml                # HyperExecute configuration
└── playwright.config.js           # Playwright configuration
```

## 🚀 HyperExecute Features Implemented

### 1. Artifacts Management
- **Screenshots**: Captured on test failures
- **Videos**: Recorded for failed tests
- **Traces**: Generated for debugging
- **Reports**: HTML and Allure reports
- **Logs**: Comprehensive execution logs

All artifacts are consolidated into downloadable files from HyperExecute dashboard.

### 2. Secret Management
```yaml
vars:
  LT_USERNAME: ${{ .secrets.LT_USERNAME }}
  LT_ACCESS_KEY: ${{ .secrets.LT_ACCESS_KEY }}
  TEST_API_KEY: ${{ .secrets.TEST_API_KEY }}
```

### 3. Environment Variables
```yaml
env:
  NODE_VERSION: 18
  TEST_ENV: hyperexecute
  BASE_URL: https://www.testmu.ai/selenium-playground/
  BROWSER_TIMEOUT: 60000
  ARTIFACTS_ENABLED: true
```

### 4. Pre Steps & Dependency Caching
- **Dependency Installation**: `npm ci` with caching
- **Browser Setup**: Playwright browser installation
- **Cache Configuration**: Node modules and Playwright browsers cached
- **Environment Verification**: Validates setup before test execution

### 5. Post Steps
- **Report Generation**: Allure and HTML reports
- **Test Summary**: Execution statistics
- **Cleanup**: Temporary file removal
- **Notifications**: Webhook notifications (optional)

### 6. Parallel Execution
```yaml
# Multiple browser/OS combinations
matrix:
  os: [win, linux]
  browser: [chrome, firefox]
  
concurrency: 2
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ 
- NPM
- LambdaTest Account for HyperExecute

### Local Setup
```bash
# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install

# Install system dependencies
npx playwright install-deps
```

### HyperExecute Setup
1. **Create LambdaTest Account**: Sign up at [LambdaTest](https://lambdatest.com)
2. **Get Credentials**: Copy Username and Access Key from dashboard
3. **Set Environment Variables**:
   ```bash
   export LT_USERNAME="your_username"
   export LT_ACCESS_KEY="your_access_key"
   ```

## 🧪 Running Tests

### Local Execution
```bash
# Run all TestMu AI tests
npm run test:testmu

# Run specific test scenarios
npm run test:testmu-simple    # Simple Form Demo
npm run test:testmu-sliders   # Drag & Drop Sliders
npm run test:testmu-input     # Input Form Submit

# Run with different browsers
npm run test:chrome
npm run test:firefox

# Run with debug mode
npm run test:debug
```

### HyperExecute Execution
```bash
# Download HyperExecute CLI
wget https://downloads.lambdatest.com/hyperexecute/linux/hyperexecute
chmod +x hyperexecute

# Execute tests on HyperExecute
./hyperexecute --config hyperexecute.yml --verbose
```

### GitHub Actions Execution
1. **Push to Repository**: Tests trigger automatically on push
2. **Manual Trigger**: Use GitHub Actions workflow_dispatch
3. **Pull Request**: Tests run on PR creation

## 📊 Reports & Artifacts

### Available Reports
- **HTML Report**: `playwright-report/index.html`
- **Allure Report**: Generated post-execution
- **JSON Report**: `test-results/results.json`
- **JUnit Report**: `test-results/results.xml`

### Artifacts Location
- **HyperExecute Dashboard**: All artifacts downloadable
- **GitHub Actions**: Artifacts tab in workflow runs
- **Local**: `test-results/`, `allure-results/`, `playwright-report/`

## 🔧 Configuration

### HyperExecute YAML Key Features
```yaml
# Parallel execution
concurrency: 2

# Secret management
vars:
  LT_USERNAME: ${{ .secrets.LT_USERNAME }}

# Environment variables
env:
  BASE_URL: https://www.testmu.ai/selenium-playground/

# Caching
cacheKey: checksum('package-lock.json')
cacheDirectories:
  - node_modules

# Artifacts
uploadArtefacts:
  - name: test-results
    path: ["test-results/**"]
```

### Playwright Configuration
- **Multiple Projects**: Chrome, Firefox, Safari, Edge, Mobile
- **LambdaTest Integration**: Cloud execution support
- **Retry Logic**: 2 retries on CI
- **Timeouts**: Configured for cloud execution

## 🔐 Security & Secrets

### Required Secrets
- `LT_USERNAME`: LambdaTest username
- `LT_ACCESS_KEY`: LambdaTest access key
- `TEST_API_KEY`: Additional API keys (optional)
- `NOTIFICATION_WEBHOOK`: Notification URL (optional)

### GitHub Repository Secrets
1. Go to Repository Settings → Secrets and Variables → Actions
2. Add the required secrets with appropriate values

## 📱 Supported Platforms

### Operating Systems
- **Windows 10**: Chrome, Firefox, Edge
- **Linux**: Chrome, Firefox
- **macOS**: Safari, Chrome, Firefox (via LambdaTest)

### Browsers
- **Chromium/Chrome**: Latest stable version
- **Firefox**: Latest stable version  
- **Safari**: Latest version (macOS only)
- **Edge**: Latest stable version

## 🚨 Troubleshooting

### Common Issues
1. **LambdaTest Connection**: Verify credentials and network
2. **Browser Installation**: Run `npx playwright install`
3. **Dependency Issues**: Clear cache and reinstall
4. **Test Timeouts**: Increase timeout values in config

### Debug Commands
```bash
# Run with debug mode
npm run test:debug

# Run with UI mode
npm run test:ui

# Generate trace
npx playwright test --trace on

# View HTML report
npm run report
```

## 📚 Documentation Links
- [Playwright Documentation](https://playwright.dev)
- [HyperExecute Documentation](https://www.lambdatest.com/hyperexecute)
- [TestMu AI Playground](https://www.testmu.ai/selenium-playground/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 🤝 Contributing
1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-test`
3. Make changes and add tests
4. Run tests locally: `npm run test:testmu`
5. Submit pull request

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.