#!/bin/bash

# Test script to verify we can push to master branch

echo "🔍 Testing master branch push capability..."

# Ensure we're on dev branch
git checkout dev

# Build the site
echo "📦 Building site..."
npm run build

# Add GitHub Pages files
echo "dev.geoffmiller.cloud" > dist/CNAME
touch dist/.nojekyll

# Create a temporary directory for the test
TEMP_DIR=$(mktemp -d)
echo "📁 Using temp directory: $TEMP_DIR"

# Copy dist to temp
cp -r dist/* "$TEMP_DIR/"

# Initialize git in temp directory
cd "$TEMP_DIR"
git init
git add -A
git commit -m "Test deployment at $(date)"

# Try to push to master
echo "🚀 Attempting to push to master..."
git push -f git@github.com:geoffmillerAZ/geoff.git HEAD:master

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to master!"
else
    echo "❌ Failed to push to master"
    echo "Trying with HTTPS..."
    git push -f https://github.com/geoffmillerAZ/geoff.git HEAD:master
fi

# Cleanup
cd -
rm -rf "$TEMP_DIR"

echo "🧹 Cleanup complete"