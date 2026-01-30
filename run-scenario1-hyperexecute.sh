#!/bin/bash

# Script to run Test Scenario 1 on HyperExecute with Chrome on Linux in parallel

echo "=========================================="
echo "Running Test Scenario 1 on HyperExecute"
echo "Chrome + Linux (2 parallel executions)"
echo "=========================================="

# Check if HyperExecute CLI is installed
if ! command -v hyperexecute &> /dev/null
then
    echo "❌ HyperExecute CLI not found!"
    echo "Please download from: https://www.lambdatest.com/support/docs/hyperexecute-cli-run-tests-on-hyperexecute-grid/"
    exit 1
fi

# Check for LambdaTest credentials
if [ -z "$LT_USERNAME" ] || [ -z "$LT_ACCESS_KEY" ]; then
    echo "⚠️  LambdaTest credentials not found in environment variables"
    echo "Please set LT_USERNAME and LT_ACCESS_KEY"
    echo ""
    echo "Example:"
    echo "export LT_USERNAME='your-username'"
    echo "export LT_ACCESS_KEY='your-access-key'"
    exit 1
fi

echo "✅ LambdaTest Username: $LT_USERNAME"
echo "✅ Running tests on HyperExecute Grid..."
echo ""

# Run HyperExecute with scenario 1 config
./hyperexecute --config hyperexecute-scenario1.yml --user "$LT_USERNAME" --key "$LT_ACCESS_KEY"

echo ""
echo "=========================================="
echo "✅ Test execution completed!"
echo "View results at: https://automation.lambdatest.com/build"
echo "=========================================="
