#!/bin/bash

# Fix .env.local security issue - Remove from Git tracking
echo "🔧 Fixing .env.local security issue..."

# Navigate to project directory
cd /Users/zkmarc/project-dyna/DynaLive

# Remove .env.local from git tracking (keeps local file)
echo "📝 Removing .env.local from Git tracking..."
git rm --cached .env.local

# Add the updated .gitignore
echo "📝 Adding updated .gitignore..."
git add .gitignore

# Add the new .env.example file
echo "📝 Adding .env.example template..."
git add .env.example

# Commit these security fixes
echo "💾 Committing security fixes..."
git commit -m "fix: remove .env.local from tracking and update .gitignore

- Remove .env.local from Git tracking for security
- Update .gitignore to exclude all environment files
- Add .env.example as template for developers"

# Push to remove .env.local from GitHub
echo "🚀 Pushing changes to GitHub..."
git push origin release/dynavest-20250819

echo "✅ Security fix complete!"
echo ""
echo "📋 Summary of changes:"
echo "  - .env.local removed from Git tracking"
echo "  - .gitignore updated to exclude all env files"
echo "  - .env.example added as template"
echo ""
echo "⚠️  Next steps:"
echo "  1. Verify .env.local is no longer visible on GitHub"
echo "  2. Consider regenerating Privy App ID if needed"
echo "  3. Team members should copy .env.example to .env.local"
