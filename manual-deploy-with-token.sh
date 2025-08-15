#!/bin/bash
set -e

# This script manually deploys to master branch
# Requires: GitHub personal access token with repo permissions

echo "Manual Deployment to Master Branch"
echo "==================================="

# Check if token is provided
if [ -z "$GITHUB_TOKEN" ]; then
  echo "❌ Error: GITHUB_TOKEN environment variable not set"
  echo "Usage: GITHUB_TOKEN=your_token ./manual-deploy-with-token.sh"
  exit 1
fi

# Environment variables
export BUILD_DIR="dist"
export DEPLOY_BRANCH="master"
export DOMAIN="dev.geoffmiller.cloud"
export REPO_URL="https://${GITHUB_TOKEN}@github.com/GeoffMillerAZ/geoff.git"

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
echo "Manual deployment: $(date)" > ${BUILD_DIR}/deployment.txt
echo "Commit: manual-$(date +%s)" >> ${BUILD_DIR}/deployment.txt

# Deploy to master
echo "🚀 Deploying to master branch..."
cd ${BUILD_DIR}

# Clean any existing git repo
rm -rf .git

# Initialize git
git init
git config user.name "Manual Deploy"
git config user.email "deploy@geoffmiller.cloud"
git config core.autocrlf false

# Add files
git add -A
git commit -m "🚀 Manual deploy - $(date +"%Y-%m-%d %H:%M:%S")"

# Push to master
echo "Pushing to master branch..."
git push -f "${REPO_URL}" HEAD:${DEPLOY_BRANCH}

echo "✅ Deployment complete!"
echo ""
echo "Check the deployment at:"
echo "👉 https://github.com/GeoffMillerAZ/geoff/tree/master"
echo "👉 https://dev.geoffmiller.cloud"