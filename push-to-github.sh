#!/bin/bash

# DynaVest - Push Current Version to GitHub Branch
# This script pushes the current version to a new branch on GitHub

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 DynaVest GitHub Push Script${NC}"
echo "=================================================="

# Get current branch name
CURRENT_BRANCH=$(git branch --show-current)
echo -e "${YELLOW}📍 Current branch: ${CURRENT_BRANCH}${NC}"

# Check if there are uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}⚠️  Uncommitted changes detected:${NC}"
    git status --short
    echo ""
    read -p "Do you want to commit these changes? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${BLUE}📝 Committing changes...${NC}"
        git add .
        echo "Enter commit message (or press Enter for default):"
        read -r COMMIT_MSG
        if [ -z "$COMMIT_MSG" ]; then
            COMMIT_MSG="Update DynaVest - $(date '+%Y-%m-%d %H:%M:%S')"
        fi
        git commit -m "$COMMIT_MSG"
        echo -e "${GREEN}✅ Changes committed${NC}"
    else
        echo -e "${RED}❌ Cannot push with uncommitted changes. Please commit or stash them first.${NC}"
        exit 1
    fi
fi

# Suggest branch name based on current date
DEFAULT_BRANCH="release/dynavest-$(date '+%Y%m%d')"
echo ""
echo -e "${BLUE}🌟 Choose a branch name for this push:${NC}"
echo "Suggested: $DEFAULT_BRANCH"
echo "Or enter a custom name:"
read -r BRANCH_NAME

if [ -z "$BRANCH_NAME" ]; then
    BRANCH_NAME=$DEFAULT_BRANCH
fi

echo -e "${YELLOW}📋 Branch name: ${BRANCH_NAME}${NC}"

# Check if branch already exists locally
if git show-ref --verify --quiet refs/heads/$BRANCH_NAME; then
    echo -e "${YELLOW}⚠️  Branch '$BRANCH_NAME' already exists locally${NC}"
    read -p "Switch to existing branch? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git checkout $BRANCH_NAME
    else
        echo -e "${RED}❌ Aborted${NC}"
        exit 1
    fi
else
    # Create and checkout new branch
    echo -e "${BLUE}🔧 Creating new branch: ${BRANCH_NAME}${NC}"
    git checkout -b $BRANCH_NAME
fi

# Update remote information
echo -e "${BLUE}🔄 Fetching latest remote information...${NC}"
git fetch origin

# Check if remote branch exists
if git ls-remote --exit-code --heads origin $BRANCH_NAME > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Branch '$BRANCH_NAME' already exists on remote${NC}"
    read -p "Force push to overwrite remote branch? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        PUSH_FLAGS="--force-with-lease"
    else
        echo -e "${RED}❌ Aborted to avoid overwriting remote branch${NC}"
        exit 1
    fi
else
    PUSH_FLAGS=""
fi

# Push to remote
echo -e "${BLUE}🚀 Pushing to GitHub...${NC}"
echo "Repository: https://github.com/abcd5251/DynaVest"
echo "Branch: $BRANCH_NAME"
echo ""

if git push $PUSH_FLAGS origin $BRANCH_NAME; then
    echo ""
    echo -e "${GREEN}✅ Successfully pushed to GitHub!${NC}"
    echo ""
    echo -e "${BLUE}📝 Summary:${NC}"
    echo "Repository: https://github.com/abcd5251/DynaVest"
    echo "Branch: $BRANCH_NAME"
    echo "View on GitHub: https://github.com/abcd5251/DynaVest/tree/$BRANCH_NAME"
    echo ""
    echo -e "${YELLOW}💡 Next steps:${NC}"
    echo "1. Visit the GitHub link above to view your code"
    echo "2. Create a Pull Request if you want to merge to main"
    echo "3. Share the branch link with collaborators"
    echo ""
    
    # Check if we want to create a PR
    read -p "Would you like to open GitHub in browser to create a Pull Request? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        PR_URL="https://github.com/abcd5251/DynaVest/compare/main...$BRANCH_NAME"
        echo -e "${BLUE}🌐 Opening browser...${NC}"
        if command -v open > /dev/null; then
            open "$PR_URL"  # macOS
        elif command -v xdg-open > /dev/null; then
            xdg-open "$PR_URL"  # Linux
        elif command -v start > /dev/null; then
            start "$PR_URL"  # Windows
        else
            echo "Please open this URL manually: $PR_URL"
        fi
    fi
    
else
    echo -e "${RED}❌ Failed to push to GitHub${NC}"
    echo "Please check your internet connection and GitHub permissions"
    exit 1
fi

echo -e "${GREEN}🎉 Done!${NC}"
