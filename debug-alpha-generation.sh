#!/bin/bash

echo "🔍 Debug Alpha Generation CCTP Issue"
echo "===================================="
echo ""

# Check if the getStrategy function has our fix
echo "📍 Checking if CCTP fix is in place..."
if grep -q "MevCapitalStrategy" /Users/zkmarc/project-dyna/DynaLive/src/utils/strategies.ts; then
    echo "✅ MevCapitalStrategy found in strategies.ts"
else
    echo "❌ MevCapitalStrategy NOT found in strategies.ts"
fi

if grep -q "isCCTPStrategy.*MevCapitalStrategy" /Users/zkmarc/project-dyna/DynaLive/src/utils/strategies.ts; then
    echo "✅ CCTP fix found in getStrategy function"
else
    echo "❌ CCTP fix NOT found in getStrategy function"
fi

echo ""
echo "📱 Next steps to troubleshoot:"
echo "1. Kill all pnpm/node processes:"
echo "   pkill -f pnpm"
echo "   pkill -f node"
echo ""
echo "2. Clear any cache:"
echo "   rm -rf .next/"
echo "   rm -rf node_modules/.cache/"
echo ""
echo "3. Restart dev server:"
echo "   pnpm dev"
echo ""
echo "4. Hard refresh browser (Cmd+Shift+R on Mac)"
echo ""
echo "🎯 Expected result: Alpha Generation should show CCTP bridge message"
echo "   instead of 'Switch Chain' when on Base network"
