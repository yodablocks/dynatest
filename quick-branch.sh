#!/bin/bash

# Alternative script for creating branch if the main script has issues
cd /Users/zkmarc/project-dyna/DynaLive

echo "🔍 Checking current git status..."
git status

echo "🌿 Creating feature branch..."
git checkout -b feature/implement-smokehouse-usdc

echo "📁 Adding files..."
git add .

echo "💾 Committing changes..."
git commit -m "feat: implement Smokehouse USDC strategy - Priority 1 complete"

echo "✅ Done! Branch created and changes committed."
