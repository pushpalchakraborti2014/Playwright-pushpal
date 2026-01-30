@echo off
REM Script to run Test Scenario 1 on HyperExecute with Chrome on Linux in parallel

echo ==========================================
echo Running Test Scenario 1 on HyperExecute
echo Chrome + Linux (2 parallel executions)
echo ==========================================

REM Check for HyperExecute CLI
where hyperexecute >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ HyperExecute CLI not found!
    echo Please download from: https://www.lambdatest.com/support/docs/hyperexecute-cli-run-tests-on-hyperexecute-grid/
    exit /b 1
)

REM Check for LambdaTest credentials
if "%LT_USERNAME%"=="" (
    echo ⚠️  LT_USERNAME not set
    echo Please set environment variables:
    echo set LT_USERNAME=your-username
    echo set LT_ACCESS_KEY=your-access-key
    exit /b 1
)

if "%LT_ACCESS_KEY%"=="" (
    echo ⚠️  LT_ACCESS_KEY not set
    echo Please set environment variables:
    echo set LT_USERNAME=your-username
    echo set LT_ACCESS_KEY=your-access-key
    exit /b 1
)

echo ✅ LambdaTest Username: %LT_USERNAME%
echo ✅ Running tests on HyperExecute Grid...
echo.

REM Run HyperExecute with scenario 1 config
hyperexecute --config hyperexecute-scenario1.yml --user "%LT_USERNAME%" --key "%LT_ACCESS_KEY%"

echo.
echo ==========================================
echo ✅ Test execution completed!
echo View results at: https://automation.lambdatest.com/build
echo ==========================================
