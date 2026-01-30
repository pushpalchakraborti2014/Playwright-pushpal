# Running Test Scenario 1 on LambdaTest HyperExecute

## Overview
This guide shows how to run Test Scenario 1 in **Chrome on Linux** with **2 parallel executions** on LambdaTest HyperExecute cloud grid.

## Prerequisites

### 1. Download HyperExecute CLI

**For Windows:**
```bash
curl -O https://downloads.lambdatest.com/hyperexecute/windows/hyperexecute.exe
```

**For Mac/Linux:**
```bash
curl -O https://downloads.lambdatest.com/hyperexecute/linux/hyperexecute
chmod +x hyperexecute
```

### 2. Set LambdaTest Credentials

Get your credentials from: https://accounts.lambdatest.com/detail/profile

**Windows (PowerShell):**
```powershell
$env:LT_USERNAME="your-username"
$env:LT_ACCESS_KEY="your-access-key"
```

**Mac/Linux:**
```bash
export LT_USERNAME="your-username"
export LT_ACCESS_KEY="your-access-key"
```

## Quick Start

### Option 1: Use the Script (Recommended)

**Windows:**
```bash
.\run-scenario1-hyperexecute.bat
```

**Mac/Linux:**
```bash
chmod +x run-scenario1-hyperexecute.sh
./run-scenario1-hyperexecute.sh
```

### Option 2: Direct Command

```bash
hyperexecute --config hyperexecute-scenario1.yml --user "your-username" --key "your-access-key"
```

## What Happens During Execution

1. **Pre Steps:**
   - Install npm dependencies
   - Install Chromium browser

2. **Parallel Execution:**
   - 2 instances of Test Scenario 1 run simultaneously
   - Both on Chrome + Linux
   - Concurrency level: 2

3. **Test Steps:**
   - ✅ Step 1: Open TestMu AI Selenium Playground
   - ✅ Step 2: Click "Simple Form Demo"
   - ✅ Step 3: Validate URL contains "simple-form-demo"
   - ✅ Step 4-5: Enter message "Welcome to TestMu AI"
   - ✅ Step 6: Click "Get Checked Value" button
   - ✅ Step 7: Validate message is displayed

4. **Post Steps:**
   - Collect logs
   - Generate reports

## View Results

After execution completes, view your test results at:
**🔗 https://automation.lambdatest.com/build**

You'll see:
- ✅ Build name: "TestMu-Scenario-1-Chrome-Linux"
- ✅ 2 parallel test executions
- ✅ Video recordings
- ✅ Screenshots
- ✅ Logs and network details
- ✅ Test duration and status

## HyperExecute Configuration Details

File: `hyperexecute-scenario1.yml`

```yaml
# OS: Linux
runson: linux

# Parallel execution
concurrency: 2

# Browser matrix
matrix:
  browser: ["chrome"]
  os: ["linux"]

# Test discovery - runs same test twice in parallel
testDiscovery:
  type: raw
  mode: static
  command: echo "tests/test-scenario-1-direct.spec.js" && echo "tests/test-scenario-1-direct.spec.js"

# Test execution command
testRunnerCommand: npx playwright test $test --project=chromium
```

## Expected Output

```
==========================================
Running Test Scenario 1 on HyperExecute
Chrome + Linux (2 parallel executions)
==========================================

✅ LambdaTest Username: your-username
✅ Running tests on HyperExecute Grid...

[HyperExecute] Test discovery completed: 2 tests found
[HyperExecute] Executing tests in parallel with concurrency: 2
[HyperExecute] Task 1: tests/test-scenario-1-direct.spec.js - RUNNING
[HyperExecute] Task 2: tests/test-scenario-1-direct.spec.js - RUNNING
[HyperExecute] Task 1: tests/test-scenario-1-direct.spec.js - PASSED ✅
[HyperExecute] Task 2: tests/test-scenario-1-direct.spec.js - PASSED ✅

==========================================
✅ Test execution completed!
View results at: https://automation.lambdatest.com/build
==========================================
```

## Troubleshooting

### Issue 1: HyperExecute CLI not found
**Solution:** Download the CLI and add to PATH
```bash
curl -O https://downloads.lambdatest.com/hyperexecute/windows/hyperexecute.exe
```

### Issue 2: Credentials not set
**Solution:** Set environment variables
```powershell
$env:LT_USERNAME="your-username"
$env:LT_ACCESS_KEY="your-access-key"
```

### Issue 3: Can't find hyperexecute.exe
**Solution:** Run from the directory where hyperexecute.exe is located

## Summary

- ✅ **Platform:** LambdaTest HyperExecute Cloud Grid
- ✅ **OS:** Linux
- ✅ **Browser:** Chrome (Chromium)
- ✅ **Parallel Execution:** 2 concurrent instances
- ✅ **Test:** Test Scenario 1 (Simple Form Demo)
- ✅ **Dashboard:** https://automation.lambdatest.com/build

## Next Steps

1. Download HyperExecute CLI
2. Set your LambdaTest credentials
3. Run: `.\run-scenario1-hyperexecute.bat`
4. Check dashboard for results
