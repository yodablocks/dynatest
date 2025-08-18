import { celo, flowMainnet, base, bsc, arbitrum, polygon, mainnet } from "viem/chains";

import type { StrategyMetadata } from "@/types";
import { USDC, CELO, FLOW, cEUR, BNB } from "@/constants/coins";
import { AAVE, UNISWAP, MORPHO, LIDO, FLUID } from "./protocols";

export const STRATEGIES = [
  "AaveV3Supply",
  "MorphoSupply", 
  "FluidSupply",
  "UniswapV3SwapLST",
  "MultiStrategy", // Composition pattern - combines multiple strategies
  "SmokehouseStrategy", // Ethereum Smokehouse USDC vault
  "Re7Strategy", // Base Re7 USDC vault
  "MevCapitalStrategy", // Ethereum MEV Capital USDC vault
  // Coming soon strategies
  "StCeloStaking",
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

// Ethereum strategies (currently empty - moved to ACTIVE)
export const ETHEREUM_STRATEGIES: StrategyMetadata[] = [];

// Active strategies on Base network + Cross-Chain strategies
export const ACTIVE_STRATEGIES: StrategyMetadata[] = [
  {
    title: "Institutional USDC",
    id: "SmokehouseStrategy",
    apy: 6.5,
    risk: "low",
    color: "#FF6B35",
    protocol: MORPHO,
    description:
      "Supply USDC to an institutional-grade MetaMorpho vault with professional risk management. Requires CCTP bridge from Base to Ethereum.",
    fullDescription:
      "Access institutional-grade USDC lending through a premium MetaMorpho vault on Ethereum mainnet with professional curation and zero bad debt history. USDC is bridged from Base to Ethereum using Circle's CCTP for fast, secure transfers (~2 minutes).",
    externalLink:
      "https://app.morpho.org/vault?vault=0xBEeFFF209270748ddd194831b3fa287a5386f5bC",
    learnMoreLink:
      "https://steakhouse.financial/",
    tokens: [USDC],
    chainId: mainnet.id,
    status: "active",
  },
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
    title: "Alpha Generation",
    id: "MevCapitalStrategy",
    apy: 7.8,
    risk: "medium",
    color: "#E74C3C",
    protocol: MORPHO,
    description:
      "Advanced MEV extraction and DeFi optimization strategies by MEV Capital. Professional institutional-grade vault on Ethereum with cutting-edge yield enhancement. Requires CCTP bridge from Base to Ethereum.",
    fullDescription:
      "Access MEV Capital's advanced alpha generation strategies through a sophisticated MetaMorpho vault on Ethereum mainnet. MEV Capital specializes in maximum extractable value (MEV) capture and DeFi optimization with institutional-grade risk management since 2020. Features cutting-edge algorithms for yield enhancement and market inefficiency exploitation. USDC is bridged from Base to Ethereum using Circle's CCTP for fast, secure transfers (~2 minutes).",
    externalLink:
      "https://app.morpho.org/ethereum/vault/0xd63070114470f685b75B74D60EEc7c1113d33a3D/mev-capital-usdc",
    learnMoreLink:
      "https://mev.capital/",
    tokens: [USDC],
    chainId: mainnet.id,
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
    id: "AaveV3Supply",
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
    id: "AaveV3Supply",
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
    title: "AAVE Supplying (BSC)",
    id: "AaveV3Supply",
    apy: 4.3,
    risk: "medium",
    color: "#1000FF",
    protocol: AAVE,
    description:
      "Supplying USDC to AAVE Lending Protocol on BSC for multi-chain yield strategies.",
    fullDescription:
      "Supplying USDC to AAVE Lending Protocol on BSC for multi-chain yield strategies.",
    externalLink:
      "https://app.aave.com/reserve-overview/?underlyingAsset=0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d&marketName=proto_bnb_v3",
    learnMoreLink:
      "https://app.aave.com/reserve-overview/?underlyingAsset=0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d&marketName=proto_bnb_v3",
    tokens: [USDC],
    chainId: bsc.id,
    status: "coming_soon",
  },

  {
    title: "Flow Ecosystem Yield",
    id: "MorphoSupply",
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

// Combined strategies metadata for backward compatibility
export const STRATEGIES_METADATA: StrategyMetadata[] = [
  ...ETHEREUM_STRATEGIES,
  ...ACTIVE_STRATEGIES,
  ...COMING_SOON_STRATEGIES,
];
