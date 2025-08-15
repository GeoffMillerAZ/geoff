#!/bin/bash
set -e

# Environment variables
export BUILD_DIR="dist"
export DEPLOY_BRANCH="master"
export DOMAIN="dev.geoffmiller.cloud"

echo "🧪 Testing deployment process locally"
echo "======================================"

# Build the site
echo "🔨 Building site..."
npx astro build

# Verify build
if [ ! -d "${BUILD_DIR}" ]; then
  echo "❌ Build failed: ${BUILD_DIR} not found"
  exit 1
fi

if [ ! -f "${BUILD_DIR}/index.html" ]; then
  echo "❌ Build failed: index.html not found"
  exit 1
fi

echo "✅ Build successful"

# Prepare deployment files
echo "📝 Preparing deployment files..."
echo "${DOMAIN}" > ${BUILD_DIR}/CNAME
touch ${BUILD_DIR}/.nojekyll
echo "Test deployment: $(date)" > ${BUILD_DIR}/deployment.txt

# Test git operations
echo "🔧 Testing git operations..."
cd ${BUILD_DIR}

# Clean any existing git repo
rm -rf .git

# Initialize git
git init
git config user.name "Test User"
git config user.email "test@example.com"
git config core.autocrlf false

# Add files
git add -A
git commit -m "Test deployment - $(date)"

echo "✅ Git operations successful"

# Show what would be deployed
echo ""
echo "📦 Files that would be deployed:"
git ls-files | head -20
echo "..."
echo "Total files: $(git ls-files | wc -l)"

echo ""
echo "✅ Deployment test completed successfully!"
echo ""
echo "To actually deploy, the workflow would run:"
echo "git push -f origin ${DEPLOY_BRANCH}"