import { base, bsc, mainnet } from "viem/chains";

import {
  GetProtocolChains,
  Protocol,
  type Strategy,
  StrategyMetadata,
} from "@/types";
import {
  BNB,
  ETH,
  FLUID,
  MORPHO,
  PERMIT_EXPIRY,
  STRATEGIES_METADATA,
  UNISWAP,
  wbETH,
  wstETH,
} from "@/constants";
import {
  BaseStrategy,
  MorphoSupply,
  UniswapV3SwapLST,
  AaveV3Supply,
  FluidSupply,
  Re7Strategy,
  StCeloStaking,
  AnkrFlowStaking,
  AsterdexBNBStaking,
} from "@/classes/strategies";
import { AAVE } from "@/constants/protocols/aave";
import { ST_CELO } from "@/constants/protocols/stCelo";
import { ANKR } from "@/constants/protocols/ankr";
import { ASTERDEX } from "@/constants/protocols/asterdex";

export function isChainSupported<T extends Protocol>(
  protocol: T,
  chainId: number
): chainId is GetProtocolChains<T> {
  return Object.keys(protocol.contracts).map(Number).includes(chainId);
}

export function getDeadline(): bigint {
  const timestampInSeconds = Math.floor(Date.now() / 1000);
  return BigInt(timestampInSeconds) + BigInt(PERMIT_EXPIRY);
}

/**
 * @dev Only used in `getStrategy`
 * @dev Allow `as`, because check chainId if supported before create strategy instance
 */
const STRATEGY_CONFIGS: Record<
  | "MorphoSupply"
  | "AaveV3Supply"
  | "AaveV3SupplyLeveraged"
  | "AaveV3SupplyBSC"
  | "AaveV3SupplyCelo"
  | "AaveV3SupplyPolygon"
  | "AaveV3SupplyArbitrum"
  | "FluidSupply"
  | "Re7Strategy"
  | "StCeloStaking"
  | "AnkrFlowStaking"
  | "AsterdexBNBStaking"
  | "UniswapV3AddLiquidity"
  | "CamelotStaking"
  | "GMXDeposit"
  | "MultiStrategy",
  {
    protocol: Protocol;
    factory: (chainId: GetProtocolChains<Protocol>) => BaseStrategy<Protocol>;
  }
> = {
  MorphoSupply: {
    protocol: MORPHO,
    factory: (chainId) =>
      new MorphoSupply(chainId as GetProtocolChains<typeof MORPHO>),
  },
  AaveV3Supply: {
    protocol: AAVE,
    factory: (chainId) =>
      new AaveV3Supply(chainId as GetProtocolChains<typeof AAVE>),
  },
  AaveV3SupplyLeveraged: {
    protocol: AAVE,
    factory: (chainId) =>
      new AaveV3Supply(chainId as GetProtocolChains<typeof AAVE>), // Uses same class as regular AaveV3Supply
  },
  AaveV3SupplyBSC: {
    protocol: AAVE,
    factory: (chainId) =>
      new AaveV3Supply(chainId as GetProtocolChains<typeof AAVE>),
  },
  AaveV3SupplyCelo: {
    protocol: AAVE,
    factory: (chainId) =>
      new AaveV3Supply(chainId as GetProtocolChains<typeof AAVE>),
  },
  AaveV3SupplyPolygon: {
    protocol: AAVE,
    factory: (chainId) =>
      new AaveV3Supply(chainId as GetProtocolChains<typeof AAVE>),
  },
  AaveV3SupplyArbitrum: {
    protocol: AAVE,
    factory: (chainId) =>
      new AaveV3Supply(chainId as GetProtocolChains<typeof AAVE>),
  },
  FluidSupply: {
    protocol: FLUID,
    factory: (chainId) =>
      new FluidSupply(chainId as GetProtocolChains<typeof FLUID>),
  },
  Re7Strategy: {
    protocol: MORPHO,
    factory: (chainId) => {
      // Re7Strategy runs on Base network
      console.log('🔧 Re7Strategy factory called with:', { chainId });
      return new Re7Strategy(chainId as GetProtocolChains<typeof MORPHO>);
    },
  },

  // Celo strategies
  StCeloStaking: {
    protocol: ST_CELO,
    factory: (chainId) =>
      new StCeloStaking(chainId as GetProtocolChains<typeof ST_CELO>),
  },

  // Flow strategies
  AnkrFlowStaking: {
    protocol: ANKR,
    factory: (chainId) =>
      new AnkrFlowStaking(chainId as GetProtocolChains<typeof ANKR>),
  },

  // BSC strategies
  AsterdexBNBStaking: {
    protocol: ASTERDEX,
    factory: (chainId) =>
      new AsterdexBNBStaking(chainId as GetProtocolChains<typeof ASTERDEX>),
  },

  UniswapV3AddLiquidity: {
    protocol: UNISWAP,
    factory: () => {
      throw new Error("UniswapV3AddLiquidity not implemented yet");
    },
  },
  CamelotStaking: {
    protocol: MORPHO, // 暫時用 MORPHO，實際應該是 CAMELOT 協議
    factory: () => {
      throw new Error("CamelotStaking not implemented yet");
    },
  },
  GMXDeposit: {
    protocol: MORPHO, // 暫時用 MORPHO，實際應該是 GMX 協議
    factory: () => {
      throw new Error("GMXDeposit not implemented yet");
    },
  },
  MultiStrategy: {
    protocol: MORPHO, // MultiStrategy is special - it can combine multiple protocols
    factory: (chainId) => {
      // For now, create a simple multi-strategy with default components
      // This should be refactored to accept strategy compositions as parameters
      throw new Error("MultiStrategy requires specific strategy composition - use MultiStrategyManager instead");
    },
  },
};

export function getStrategy<
  T extends keyof typeof STRATEGY_CONFIGS
>(
  strategy: T,
  chainId: number
): BaseStrategy<Protocol> {
  const config = STRATEGY_CONFIGS[strategy];

  try {
    // All active strategies operate directly on their native chains
    if (isChainSupported(config.protocol, chainId)) {
      return config.factory(chainId);
    }
    throw new Error(`Strategy ${strategy} not found on chain ${chainId}`);
  } catch (error) {
    console.error(error);
    throw new Error(`Strategy ${strategy} not found on chain ${chainId}`);
  }
}

export function getStrategyMetadata(
  strategy: Strategy,
  chainId: number
): StrategyMetadata {
  const strategyMetadata = STRATEGIES_METADATA.find(
    (s) => s.id === strategy && s.chainId === chainId
  );

  if (!strategyMetadata) throw new Error("Strategy metadata not found");
  return strategyMetadata;
}
