#!/bin/bash

echo "Manual deployment test script"
echo "==============================="

# Build the site
echo "Building site..."
npm run build || npx astro build

if [ ! -d "dist" ]; then
  echo "ERROR: dist folder not found after build!"
  exit 1
fi

echo "Build successful!"
echo "Files in dist:"
ls -la dist/ | head -10

echo ""
echo "This would deploy to master branch:"
echo "1. cd dist"
echo "2. git init"
echo "3. git checkout --orphan master"
echo "4. git add -A"
echo "5. git commit -m 'Deploy'"
echo "6. git push -f origin master"
echo ""
echo "To actually deploy, run the commands manually"