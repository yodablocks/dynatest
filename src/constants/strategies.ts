import { celo, flowMainnet, base, bsc, arbitrum, polygon, mainnet } from "viem/chains";

import type { StrategyMetadata } from "@/types";
import { USDC, CELO, FLOW, cEUR, BNB, WBNB } from "@/constants/coins";
import { AAVE, UNISWAP, MORPHO, LIDO, FLUID, ST_CELO } from "./protocols";

export const STRATEGIES = [
  // Active strategies
  "AaveV3Supply",
  "AaveV3SupplyLeveraged", // Enhanced Returns - leveraged AAVE position
  "MorphoSupply",
  "FluidSupply",
  "Re7Strategy", // Base Re7 USDC vault
  "MultiStrategy", // Composition pattern - combines multiple strategies
  "StCeloStaking", // Celo liquid staking
  "AaveV3SupplyCelo", // AAVE on Celo
  // Coming soon strategies
  "UniswapV3SwapLST", // Liquid Staking
  "AaveV3SupplyArbitrum", // AAVE on Arbitrum
  "AaveV3SupplyBSC", // AAVE on BSC
  "MorphoSupplyFlow", // Morpho on Flow
  "CamelotStaking",
  "GMXDeposit",
] as const;

export const BOT_STRATEGY: StrategyMetadata = {
  title: "Multi-Strategy Portfolio",
  id: "MultiStrategy",
  apy: 0,
  risk: "low",
  protocol: AAVE,
  description: "Composition pattern that combines multiple DeFi strategies for diversified portfolio optimization",
  fullDescription: "AI-powered composition strategy that combines multiple proven DeFi protocols (AAVE, Morpho, Fluid, Uniswap) for optimized risk-adjusted returns on Base network",
  externalLink: "",
  learnMoreLink: "",
  tokens: [USDC],
  chainId: base.id,
  color: "#1000FF",
  status: "composition",
};

// CCTP strategies have been removed due to bridging incompatibility with Privy smart wallets
// These strategies are no longer available and have been completely removed from the platform

// Active strategies on Base network only
export const ACTIVE_STRATEGIES: StrategyMetadata[] = [
  {
    title: "Professional Yield",
    id: "Re7Strategy",
    apy: 8.2,
    risk: "medium",
    color: "#4C9AFF",
    protocol: MORPHO,
    description:
      "Supply USDC to Re7 Labs institutional-grade MetaMorpho vault on Base network with $700M+ TVL and professional risk management.",
    fullDescription:
      "Access Re7 Labs' institutional-grade USDC lending through a premium MetaMorpho vault on Base network. Re7 Labs manages $700M+ TVL with institutional validation and professional risk management. Features a 20% performance fee structure.",
    externalLink:
      "https://app.morpho.org/base/vault/0x12AFDeFb2237a5963e7BAb3e2D46ad0eee70406e/re7-usdc",
    learnMoreLink:
      "https://re7.capital/",
    tokens: [USDC],
    chainId: base.id,
    status: "active",
  },
  {
    title: "Conservative Yield",
    id: "AaveV3Supply",
    apy: 6.1,
    risk: "medium",
    color: "#9896FF",
    protocol: AAVE,
    description:
      "Supplying USDC to AAVE Lending Protocol enables earning interest and rewards, maximizing returns in DeFi.",
    fullDescription:
      "Supplying USDC to AAVE Lending Protocol enables earning interest and rewards, maximizing returns in DeFi.",
    externalLink:
      "https://app.aave.com/reserve-overview/?underlyingAsset=0x833589fcd6edb6e08f4c7c32d4f71b54bda02913&marketName=proto_base_v3",
    learnMoreLink:
      "https://app.aave.com/reserve-overview/?underlyingAsset=0x833589fcd6edb6e08f4c7c32d4f71b54bda02913&marketName=proto_base_v3",
    tokens: [USDC],
    chainId: base.id,
    status: "active",
  },
  {
    title: "Optimized Lending",
    id: "MorphoSupply",
    apy: 6.7,
    risk: "medium",
    color: "#C4DAFF",
    protocol: MORPHO,
    description:
      "Supplying USDC to Morpho Lending Protocol enables earning optimized interest and rewards through advanced yield strategies.",
    fullDescription:
      "Supplying USDC to Morpho Lending Protocol enables earning optimized interest and rewards through advanced yield strategies.",
    externalLink:
      "https://app.morpho.org/base/market/0x8793cf302b8ffd655ab97bd1c695dbd967807e8367a65cb2f4edaf1380ba1bda/weth-usdc",
    learnMoreLink:
      "https://app.morpho.org/base/market/0x8793cf302b8ffd655ab97bd1c695dbd967807e8367a65cb2f4edaf1380ba1bda/weth-usdc",
    tokens: [USDC],
    chainId: base.id,
    status: "active",
  },

  {
    title: "Enhanced Returns",
    id: "AaveV3SupplyLeveraged",
    apy: 10.1,
    risk: "medium",
    color: "#9896FF",
    protocol: AAVE,
    description:
      "Leverage USDC positions on AAVE for amplified returns while maintaining calculated risk exposure.",
    fullDescription:
      "Leverage USDC positions on AAVE for amplified returns while maintaining calculated risk exposure.",
    externalLink:
      "https://app.aave.com/reserve-overview/?underlyingAsset=0x833589fcd6edb6e08f4c7c32d4f71b54bda02913&marketName=proto_base_v3",
    learnMoreLink:
      "https://app.aave.com/reserve-overview/?underlyingAsset=0x833589fcd6edb6e08f4c7c32d4f71b54bda02913&marketName=proto_base_v3",
    tokens: [USDC],
    chainId: base.id,
    status: "active",
  },
  {
    title: "Dynamic Yield",
    id: "FluidSupply",
    apy: 6.23,
    risk: "medium",
    color: "#3f75ff",
    protocol: FLUID,
    description:
      "Supplying USDC to Fluid Lending Protocol enables earning interest and rewards, maximizing returns in DeFi.",
    fullDescription:
      "Supplying USDC to Fluid Lending Protocol enables earning interest and rewards, maximizing returns in DeFi.",
    externalLink: "https://fluid.io/",
    learnMoreLink: "https://fluid.io/",
    tokens: [USDC],
    chainId: base.id,
    status: "active",
  },
  {
    title: "CELO Liquid Staking",
    id: "StCeloStaking",
    apy: 4.5,
    risk: "low",
    color: "#35D07F",
    protocol: ST_CELO,
    description:
      "Stake CELO tokens to earn staking rewards while maintaining liquidity through stCELO liquid staking tokens.",
    fullDescription:
      "Stake CELO tokens through StakedCelo protocol to earn staking rewards while receiving stCELO tokens that can be used across DeFi. StakedCelo is a liquid staking protocol that allows you to earn staking rewards while maintaining the flexibility to use your staked assets.",
    externalLink: "https://app.stcelo.xyz/",
    learnMoreLink: "https://docs.stcelo.xyz/",
    tokens: [CELO],
    chainId: celo.id,
    status: "active",
  },
  {
    title: "AAVE Lending (Celo)",
    id: "AaveV3SupplyCelo",
    apy: 5.2,
    risk: "medium",
    color: "#9896FF",
    protocol: AAVE,
    description:
      "Supply CELO tokens to AAVE V3 on Celo network to earn lending interest with sub-cent transaction costs.",
    fullDescription:
      "Supply CELO tokens to AAVE V3 lending protocol on Celo network. AAVE is a battle-tested DeFi protocol with over $10B in TVL. Earn competitive yields on your CELO holdings with 1-second transaction finality and minimal fees.",
    externalLink: "https://app.aave.com/markets/?marketName=proto_celo_v3",
    learnMoreLink: "https://docs.aave.com/",
    tokens: [CELO],
    chainId: celo.id,
    status: "active",
  },
  {
    title: "AAVE BNB Lending",
    id: "AaveV3SupplyBSC",
    apy: 4.5,
    risk: "medium",
    color: "#9896FF",
    protocol: AAVE,
    description:
      "Supply WBNB to AAVE V3 on BNB Chain to earn competitive lending interest with institutional-grade security.",
    fullDescription:
      "Supply WBNB (Wrapped BNB) to AAVE V3 lending protocol on BNB Chain. AAVE is a battle-tested DeFi protocol with over $43B in global TVL. Earn competitive yields on your BNB holdings with proven security and reliability.",
    externalLink: "https://app.aave.com/markets/?marketName=proto_bnb_v3",
    learnMoreLink: "https://docs.aave.com/",
    tokens: [WBNB],
    chainId: bsc.id,
    status: "active",
  },
];

// Coming Soon strategies (other chains and protocols)
export const COMING_SOON_STRATEGIES: StrategyMetadata[] = [
  {
    title: "Liquid Staking",
    id: "UniswapV3SwapLST",
    apy: 2.8,
    risk: "low",
    color: "#F50DB5",
    protocol: LIDO,
    description:
      "Staking tokens to operate network nodes helps to maintain security on the blockchain.",
    fullDescription:
      "Staking tokens to operate network nodes helps to maintain security on the blockchain.",
    externalLink: "https://lido.fi/",
    learnMoreLink: "https://lido.fi/",
    tokens: [USDC],
    chainId: base.id,
    status: "coming_soon",
  },
  {
    title: "AAVE Lending (Arbitrum)",
    id: "AaveV3SupplyArbitrum",
    apy: 4.5,
    risk: "medium",
    color: "#9896FF",
    protocol: AAVE,
    description:
      "Supplying USDC to AAVE Lending Protocol on Arbitrum enables earning interest and rewards.",
    fullDescription:
      "Supplying USDC to AAVE Lending Protocol on Arbitrum enables earning interest and rewards.",
    externalLink:
      "https://app.aave.com/reserve-overview/?underlyingAsset=0xaf88d065e77c8cc2239327c5edb3a432268e5831&marketName=proto_arbitrum_v3",
    learnMoreLink:
      "https://app.aave.com/reserve-overview/?underlyingAsset=0xaf88d065e77c8cc2239327c5edb3a432268e5831&marketName=proto_arbitrum_v3",
    tokens: [USDC],
    chainId: arbitrum.id,
    status: "coming_soon",
  },
  {
    title: "Flow Ecosystem Yield",
    id: "MorphoSupplyFlow",
    apy: 4.3,
    risk: "low",
    color: "#1000FF",
    protocol: MORPHO,
    description:
      "Access Flow blockchain DeFi opportunities through integrated lending protocols.",
    fullDescription:
      "Access Flow blockchain DeFi opportunities through integrated lending protocols.",
    externalLink: "https://kitty.com",
    learnMoreLink: "https://kitty.com",
    tokens: [FLOW],
    chainId: flowMainnet.id,
    status: "coming_soon",
  },
];

// Combined strategies metadata - Base network focus
export const STRATEGIES_METADATA: StrategyMetadata[] = [
  ...ACTIVE_STRATEGIES,
  ...COMING_SOON_STRATEGIES,
];
