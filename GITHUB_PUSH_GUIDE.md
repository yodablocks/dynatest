# DynaVest GitHub Push Guide

## Quick Commands

### Option 1: Use the Interactive Script
```bash
chmod +x push-to-github.sh
./push-to-github.sh
```

### Option 2: Use Quick Push
```bash
chmod +x quick-push.sh
./quick-push.sh                                    # Auto-generated branch name
./quick-push.sh my-feature-branch                  # Custom branch name
./quick-push.sh my-branch "My commit message"      # Custom branch + message
```

### Option 3: Manual Git Commands
```bash
# 1. Check current status
git status

# 2. Add and commit changes (if any)
git add .
git commit -m "Update DynaVest - $(date)"

# 3. Create and switch to new branch
git checkout -b release/dynavest-20250819

# 4. Push to GitHub
git push -u origin release/dynavest-20250819
```

## Current Repository Info

- **Repository**: https://github.com/abcd5251/DynaVest
- **Current Branch**: `feature/alpha-generation-cctp-fix`
- **Remote**: Already configured as `origin`

## Recommended Branch Names

- `release/dynavest-YYYYMMDD` - For release versions
- `feature/feature-name` - For new features
- `update/description` - For general updates
- `hotfix/issue-name` - For urgent fixes

## After Pushing

1. **View on GitHub**: https://github.com/abcd5251/DynaVest/branches
2. **Create Pull Request**: Compare your branch with `main`
3. **Share Branch**: Send the direct branch URL to collaborators

## Example Branch URLs
- https://github.com/abcd5251/DynaVest/tree/release/dynavest-20250819
- https://github.com/abcd5251/DynaVest/tree/feature/alpha-generation-cctp-fix

## Troubleshooting

### If push fails:
```bash
# Check remote connection
git remote -v

# Fetch latest changes
git fetch origin

# Try force push (careful!)
git push --force-with-lease origin your-branch-name
```

### If branch already exists:
```bash
# Switch to existing branch
git checkout existing-branch-name

# Or delete and recreate
git branch -D existing-branch-name
git checkout -b existing-branch-name
```

## Project Structure Overview

Your DynaVest project includes:
- ✅ Next.js frontend application
- ✅ TypeScript configuration
- ✅ Multiple DeFi strategy implementations
- ✅ CCTP bridge integration
- ✅ APY integration documentation
- ✅ Strategy configuration files

## Current Strategies Implemented
1. **Institutional USDC** (SmokehouseStrategy) - 6.5% APY
2. **Professional Yield** (Re7Strategy) - 8.2% APY  
3. **Alpha Generation** (MevCapitalStrategy) - 7.8% APY
4. **Conservative Yield** (AaveV3Supply) - 6.1% APY
5. **Optimized Lending** (MorphoSupply) - 6.7% APY
6. **Enhanced Returns** (AaveV3Supply Leveraged) - 10.1% APY
7. **Dynamic Yield** (FluidSupply) - 6.23% APY
