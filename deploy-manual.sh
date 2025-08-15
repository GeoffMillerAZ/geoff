#!/bin/bash
set -e

echo "Manual deployment to master branch"
echo "==================================="

# Build the site
echo "Building site..."
npx astro build

# Prepare deployment files
echo "dev.geoffmiller.cloud" > dist/CNAME
touch dist/.nojekyll

# Deploy to master
cd dist
git init
git checkout -b master
git add -A
git commit -m "Deploy dev site from manual deployment"
git remote add origin https://github.com/GeoffMillerAZ/geoff.git
git push -f origin master

echo "Deployment complete!"