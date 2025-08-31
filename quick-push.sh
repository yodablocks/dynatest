#!/bin/bash

# Quick GitHub Push - Simple version
# Usage: ./quick-push.sh [branch-name] [commit-message]

BRANCH_NAME=${1:-"update/$(date '+%Y%m%d-%H%M')"}
COMMIT_MSG=${2:-"Update DynaVest - $(date '+%Y-%m-%d %H:%M:%S')"}

echo "🚀 Quick push to GitHub..."
echo "Branch: $BRANCH_NAME"
echo "Commit: $COMMIT_MSG"

# Commit any changes
if [ -n "$(git status --porcelain)" ]; then
    git add .
    git commit -m "$COMMIT_MSG"
fi

# Create/switch to branch
git checkout -b $BRANCH_NAME 2>/dev/null || git checkout $BRANCH_NAME

# Push to GitHub
git push -u origin $BRANCH_NAME

echo "✅ Pushed to: https://github.com/abcd5251/DynaVest/tree/$BRANCH_NAME"
