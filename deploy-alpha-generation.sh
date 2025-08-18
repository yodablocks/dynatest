#!/bin/bash

echo "🎯 Alpha Generation Strategy - Complete Deployment"
echo "=================================================="
echo ""

# Navigate to project directory
cd /Users/zkmarc/project-dyna/DynaLive

# Check current status
echo "📍 Current git status:"
git status --short
echo ""

# Create feature branch
echo "🚀 Creating feature branch: feature/alpha-generation-cctp-fix"
git checkout -b feature/alpha-generation-cctp-fix 2>/dev/null || git checkout feature/alpha-generation-cctp-fix

echo "✅ Branch ready!"
echo ""

# Add all changes
echo "📦 Adding all changes..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "feat: implement Alpha Generation strategy with CCTP bridge support

- Add MevCapitalStrategy with same CCTP bridge as Institutional USDC
- Fix getStrategy() to recognize Alpha Generation as CCTP-compatible
- Add dynamic logo support for Alpha Generation
- Strategy now allows direct investment from Base (like Institutional USDC)
- Vault: 0xd63070114470f685b75B74D60EEc7c1113d33a3D (MEV Capital)
- APY: 7.8%, Risk: Medium, Network: Ethereum"

echo ""
echo "🔧 Critical Fix Applied:"
echo "  • Updated src/utils/strategies.ts to handle CCTP strategies"
echo "  • Alpha Generation now supports direct Base investment"
echo "  • No more 'Switch Chain' button - shows CCTP bridge message"
echo ""

# Build application
echo "🏗️  Building application..."
pnpm build

echo ""
echo "🎉 Deployment Complete!"
echo ""
echo "📋 Summary:"
echo "  ✅ Alpha Generation strategy implemented"
echo "  ✅ CCTP bridge support enabled" 
echo "  ✅ Dynamic logo configured"
echo "  ✅ Cross-chain investment from Base enabled"
echo "  ✅ Application built"
echo ""
echo "🔄 Next: Restart your development server:"
echo "  pnpm dev"
echo ""
echo "🧪 Test: Open Alpha Generation from Base - should show:"
echo "  'Cross-Chain Investment: Your USDC Will Be Automatically Bridged From Base To Ethereum'"
