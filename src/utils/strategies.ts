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
  SmokehouseStrategy,
  Re7Strategy,
  MevCapitalStrategy,
} from "@/classes/strategies";
import { AAVE } from "@/constants/protocols/aave";
import { SMOKEHOUSE } from "@/constants/protocols/smokehouse";

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
  | "UniswapV3SwapLST"
  | "FluidSupply"
  | "SmokehouseStrategy"
  | "Re7Strategy"
  | "MevCapitalStrategy"
  | "StCeloStaking"
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
  UniswapV3SwapLST: {
    protocol: UNISWAP,
    factory: (chainId) => {
      const typedChainId = chainId as GetProtocolChains<typeof UNISWAP>;
      // 根據不同鏈條選擇不同的 token 組合
      if (chainId === bsc.id) {
        return new UniswapV3SwapLST(typedChainId, BNB, wbETH);
      } else {
        return new UniswapV3SwapLST(typedChainId, ETH, wstETH);
      }
    },
  },
  FluidSupply: {
    protocol: FLUID,
    factory: (chainId) =>
      new FluidSupply(chainId as GetProtocolChains<typeof FLUID>),
  },
  SmokehouseStrategy: {
    protocol: MORPHO,
    factory: (chainId) => {
      // SmokehouseStrategy always runs on Ethereum mainnet regardless of user's current chain
      console.log('🔧 SmokehouseStrategy factory called with:', { userChainId: chainId, mainnetId: mainnet.id });
      return new SmokehouseStrategy(mainnet.id as GetProtocolChains<typeof MORPHO>);
    },
  },
  Re7Strategy: {
    protocol: MORPHO,
    factory: (chainId) => {
      // Re7Strategy runs on Base network
      console.log('🔧 Re7Strategy factory called with:', { chainId });
      return new Re7Strategy(chainId as GetProtocolChains<typeof MORPHO>);
    },
  },
  MevCapitalStrategy: {
    protocol: MORPHO,
    factory: (chainId) => {
      // MevCapitalStrategy always runs on Ethereum mainnet regardless of user's current chain
      console.log('🔧 MevCapitalStrategy factory called with:', { userChainId: chainId, mainnetId: mainnet.id });
      return new MevCapitalStrategy(mainnet.id as GetProtocolChains<typeof MORPHO>);
    },
  },

  // Legacy
  StCeloStaking: {
    protocol: MORPHO, // 暫時用 MORPHO，實際應該是 CELO 協議
    factory: () => {
      throw new Error("StCeloStaking not implemented yet");
    },
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
    // Special handling for cross-chain strategies that use CCTP bridge
    const isCCTPStrategy = strategy === "SmokehouseStrategy" || strategy === "MevCapitalStrategy";
    
    if (isCCTPStrategy) {
      // For CCTP strategies: accept both Base and Ethereum chain IDs
      // They always deploy to Ethereum but can be accessed from Base via CCTP bridge
      if (chainId === base.id || chainId === mainnet.id) {
        return config.factory(chainId);
      }
      throw new Error(`Strategy ${strategy} not supported on chain ${chainId}. Available on Base and Ethereum.`);
    }
    
    // Standard strategies: check if protocol supports the chain
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
