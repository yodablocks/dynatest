#!/bin/bash

echo "🔧 Fix Applied for Alpha Generation CCTP Support!"
echo "================================================"
echo ""

echo "✅ Fixed InvestmentForm.tsx to support MevCapitalStrategy:"
echo "   - Added MevCapitalStrategy to isSupportedChain logic"
echo "   - Added MevCapitalStrategy to Cross-Chain Investment message"
echo "   - Now Alpha Generation will show CCTP bridge message like Institutional USDC"
echo ""

echo "🔄 Restarting development server..."
pkill -f pnpm
pkill -f node

echo "Starting pnpm dev..."
pnpm dev &

echo ""
echo "🎯 Expected Result:"
echo "Alpha Generation should now show:"
echo "'Cross-Chain Investment: Your USDC Will Be Automatically Bridged From Base To Ethereum'"
echo ""
echo "Instead of 'Switch Chain' button! ✅"
