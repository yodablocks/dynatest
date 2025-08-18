#!/bin/bash

# Navigate to the project directory
cd /Users/zkmarc/project-dyna/DynaLive

echo "🌟 Creating feature branch for Smokehouse USDC strategy implementation..."

# Create and switch to the feature branch
git checkout -b feature/implement-smokehouse-usdc

echo "✅ Switched to feature/implement-smokehouse-usdc branch"

# Add all the modified and new files
git add src/utils/strategies.ts
git add src/providers/config.ts
git add src/constants/coins.ts
git add src/test/strategies/smokehouse_test.ts
git add SMOKEHOUSE_IMPLEMENTATION.md

echo "📁 Added modified and new files to staging"

# Check git status
echo "📋 Current git status:"
git status

# Commit the changes
git commit -m "feat: implement Smokehouse USDC strategy

- Add SmokehouseStrategy class integration to strategy factory
- Add Ethereum mainnet support to wagmiConfig
- Fix USDC contract address for Ethereum mainnet
- Add comprehensive test suite for SmokehouseStrategy
- Add complete implementation documentation

Strategy Details:
- Vault: 0xBEeFFF209270748ddd194831b3fa287a5386f5bC
- Curator: Steakhouse Financial (zero bad debt record)
- Expected APY: ~6.5%
- Risk Level: Low
- Chain: Ethereum Mainnet

Files Modified:
- src/utils/strategies.ts - Added SmokehouseStrategy to factory
- src/providers/config.ts - Added mainnet chain support
- src/constants/coins.ts - Corrected USDC mainnet address

Files Added:
- src/test/strategies/smokehouse_test.ts - Test suite
- SMOKEHOUSE_IMPLEMENTATION.md - Documentation"

echo "✅ Committed Smokehouse USDC strategy implementation"

echo "🎯 Branch created and changes committed successfully!"
echo "📝 Run 'git log --oneline -5' to see the latest commits"
echo "🔄 To push to remote: git push -u origin feature/implement-smokehouse-usdc"
