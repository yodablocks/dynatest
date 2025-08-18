# Smokehouse USDC Strategy Implementation

## Overview

The Smokehouse USDC strategy has been successfully implemented for the DynaVest platform. This strategy allows users to supply USDC to the Smokehouse MetaMorpho vault on Ethereum mainnet, curated by Steakhouse Financial.

## Strategy Details

### Protocol Information
- **Vault Address:** `0xBEeFFF209270748ddd194831b3fa287a5386f5bC`
- **Curator:** Steakhouse Financial (largest Morpho curator, zero bad debt record)
- **Protocol:** MetaMorpho vault on Ethereum mainnet
- **Asset:** USDC (USD Coin)
- **Risk Level:** Low
- **Expected APY:** ~6.5%

### Key Features
- **Zero Bad Debt Record:** Steakhouse Financial has maintained an impeccable safety record
- **Institutional-Grade Risk Management:** Professional curation and monitoring
- **Ethereum Native:** Deployed on the most secure and battle-tested blockchain
- **MetaMorpho Technology:** Built on top of Morpho's efficient lending protocol

## Implementation Files

### Core Strategy Files
1. **Strategy Class:** `/src/classes/strategies/steakhouse/smokehouse.ts`
   - Implements the core strategy logic
   - Handles invest/redeem operations
   - Calculates profit and share prices

2. **Protocol Constants:** `/src/constants/protocols/smokehouse.ts`
   - Defines the SMOKEHOUSE protocol configuration
   - Contains vault address and metadata

3. **Strategy Integration:** `/src/utils/strategies.ts`
   - Updated to include SmokehouseStrategy in the factory
   - Enables dynamic strategy instantiation

4. **Strategy Metadata:** `/src/constants/strategies.ts`
   - Defines strategy metadata for UI display
   - Includes APY, risk level, and external links

### Configuration Updates
5. **Blockchain Configuration:** `/src/providers/config.ts`
   - Added Ethereum mainnet support to wagmiConfig
   - Configured RPC endpoints for mainnet

6. **Token Definitions:** `/src/constants/coins.ts`
   - Updated USDC contract address for Ethereum mainnet
   - Corrected to official USDC address: `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48`

### Testing
7. **Test Suite:** `/src/test/strategies/smokehouse_test.ts`
   - Comprehensive unit tests for all strategy functions
   - Mocks external dependencies
   - Tests error handling and edge cases

## Technical Implementation

### Strategy Class Methods

#### `investCalls(amount: bigint, user: Address, asset?: Address)`
Generates transaction calls for investing USDC into the Smokehouse vault:
1. **Approve:** Approves USDC spending by the vault
2. **Deposit:** Deposits USDC into the MetaMorpho vault

#### `redeemCalls(shares: bigint, user: Address, asset?: Address)`
Generates transaction calls for redeeming shares from the vault:
1. **Redeem:** Burns vault shares and returns underlying USDC

#### `getProfit(user: Address, position: Position)`
Calculates profit percentage based on:
- Current share price from vault
- Entry price when position was opened
- Fallback to time-based estimation if vault call fails

#### Additional Helper Methods
- `getCurrentSharePrice()`: Gets current USDC value per vault share
- `getTotalAssets()`: Returns total assets under management
- `getUserShares(user: Address)`: Gets user's vault share balance

### Error Handling

The strategy implementation includes robust error handling:
- **Network Failures:** Graceful fallbacks for RPC errors
- **Time-based Estimation:** Fallback profit calculation using historical APY
- **Input Validation:** Ensures required parameters are provided
- **Chain Validation:** Verifies operations on supported networks

## Integration with DynaVest

### Strategy Factory
The strategy is registered in `STRATEGY_CONFIGS` with:
```typescript
SmokehouseStrategy: {
  protocol: SMOKEHOUSE,
  factory: (chainId) =>
    new SmokehouseStrategy(chainId as GetProtocolChains<typeof SMOKEHOUSE>),
}
```

### UI Metadata
Strategy appears in the UI with:
- **Title:** "Smokehouse USDC"
- **Color:** `#FF6B35` (orange theme)
- **Status:** Active
- **External Links:** Direct links to Morpho vault and Steakhouse Financial

### Chain Support
- **Supported:** Ethereum Mainnet (Chain ID: 1)
- **RPC Endpoints:** Alchemy API with fallback to public endpoints
- **Token:** USDC at `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48`

## Security Considerations

### Steakhouse Financial Safety Record
- **Zero Bad Debt:** No historical losses across all managed positions
- **Largest Curator:** Most trusted curator in the Morpho ecosystem
- **Institutional Validation:** Used by professional trading firms
- **Transparent Operations:** All positions publicly auditable on-chain

### Smart Contract Security
- **MetaMorpho Audits:** Vault contracts audited by leading security firms
- **Battle-tested:** MetaMorpho vaults have managed billions in TVL
- **Ethereum Security:** Benefits from Ethereum's proven security model
- **Withdrawal Guarantees:** Users can always redeem their proportional share

## Testing and Validation

### Unit Tests Coverage
- ✅ Strategy instantiation and configuration
- ✅ Investment call generation
- ✅ Redemption call generation
- ✅ Profit calculation (both success and error cases)
- ✅ Chain support validation
- ✅ Error handling scenarios
- ✅ Helper method functionality

### Integration Tests
To run tests:
```bash
npm run test src/test/strategies/smokehouse_test.ts
```

## Usage Example

```typescript
import { SmokehouseStrategy } from '@/classes/strategies';
import { mainnet } from 'viem/chains';
import { USDC } from '@/constants/coins';

// Initialize strategy
const strategy = new SmokehouseStrategy(mainnet.id);
const userAddress = '0x...';
const usdcAddress = USDC.chains[mainnet.id];
const amount = BigInt('1000000000'); // 1000 USDC

// Generate investment calls
const investCalls = await strategy.investCalls(amount, userAddress, usdcAddress);

// Execute calls through DynaVest executor
// ... transaction execution logic

// Later, calculate profit
const position = getUserPosition(); // Get user's position
const profitPercentage = await strategy.getProfit(userAddress, position);
console.log(`Current profit: ${profitPercentage.toFixed(2)}%`);
```

## External Resources

- **Vault Interface:** [Morpho App](https://app.morpho.org/vault?vault=0xBEeFFF209270748ddd194831b3fa287a5386f5bC)
- **Curator Information:** [Steakhouse Financial](https://steakhouse.financial/)
- **MetaMorpho Documentation:** [Morpho Docs](https://docs.morpho.org/)
- **USDC Contract:** [Etherscan](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48)

## Next Steps

The Smokehouse USDC strategy is now fully implemented and ready for:
1. **Frontend Integration:** UI components can use the strategy metadata
2. **User Testing:** Strategy can be tested with small amounts
3. **Production Deployment:** Ready for mainnet usage
4. **Monitoring Setup:** Consider adding analytics for vault performance

## Implementation Status: ✅ Complete

All required components have been implemented and tested:
- ✅ Strategy class with full functionality
- ✅ Protocol configuration
- ✅ Strategy factory integration
- ✅ UI metadata configuration
- ✅ Blockchain configuration updates
- ✅ Token address corrections
- ✅ Comprehensive testing suite
- ✅ Documentation and examples
