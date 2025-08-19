# Dynamic Risk Assessment - Quick Start

## ✅ What's Done

1. **Research-backed risk calculation** - Based on Exponential DeFi + academic studies
2. **Components updated** - StrategyTable and StrategyCard now use dynamic risk
3. **Test page created** - Visit `/risk-test` to see it working

## 🧪 Test It

```bash
pnpm dev
# Visit: http://localhost:3000/risk-test
```

## 📊 Expected Changes

Your current strategies will show these risk adjustments:

- **AAVE strategies** → Lower risk (battle-tested protocol)
- **Enhanced Returns** → Higher risk (leverage detected)
- **MEV/Alpha strategies** → Higher risk (complexity)
- **Institutional strategies** → Risk reduction (professional management)

## ⚙️ How It Works

Risk calculation weighs 4 factors:
- **Protocol** (40%) - AAVE=low, Morpho=medium, Fluid=higher
- **APY** (25%) - Higher APY = higher risk
- **Chain** (20%) - Ethereum=lowest, Base=low
- **Strategy** (15%) - Leverage/MEV = higher risk

## 🎛️ Controls

Toggle in components:
```tsx
const displayRisk = assessment?.level || strategy.risk; // Dynamic with fallback
```

That's it! The system is live and working. 🚀