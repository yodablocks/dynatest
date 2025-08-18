#!/bin/bash

# Create feature branch for MEV Capital USDC Strategy
echo "🚀 Creating feature branch for MEV Capital USDC Strategy..."

# Check current branch
current_branch=$(git branch --show-current)
echo "📍 Current branch: $current_branch"

# Create and switch to feature branch
git checkout -b feature/implement-mev-capital-usdc

echo "✅ Created and switched to: feature/implement-mev-capital-usdc"
echo "🎯 Ready to implement MEV Capital USDC strategy!"

# Show branch status
git status
