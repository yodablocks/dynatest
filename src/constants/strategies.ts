import { celo, flowMainnet, base, bsc, arbitrum, polygon, mainnet } from "viem/chains";

import type { StrategyMetadata } from "@/types";
import { USDC, USDT, CELO, FLOW, cEUR, WBNB } from "@/constants/coins";
import { AAVE, UNISWAP, MORPHO, LIDO, FLUID, ST_CELO, ANKR, IPOR, AVANTIS, HARVEST } from "./protocols";

export const STRATEGIES = [
  // Active strategies
  "AaveV3Supply",
  "AaveV3SupplyLeveraged", // Enhanced Returns - leveraged AAVE position
  "MorphoSupply",
  "FluidSupply",
  "Re7Strategy", // Base Re7 USDC vault
  "IporFusionSupply", // IPOR Fusion yoUSD Loooper on Base
  "AvantisVaultSupply", // Avantis perpetuals vault on Base
  "HarvestFortyAcresUSDC", // Harvest Finance 40 Acres USDC vault on Base
  "HarvestAutopilotUSDC", // Harvest Finance Autopilot USDC vault on Base
  "MultiStrategy", // Composition pattern - combines multiple strategies
  "StCeloStaking", // Celo liquid staking
  "AaveV3SupplyCelo", // AAVE on Celo
  "AaveV3SupplyUSDTCelo", // AAVE USDT on Celo
  "AaveV3SupplyBSC", // AAVE on BSC
  "AaveV3SupplyPolygon", // AAVE on Polygon
  "AaveV3SupplyArbitrum", // AAVE on Arbitrum
  "AnkrFlowStaking", // Ankr Flow liquid staking
  // Coming soon strategies
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
    title: "Pro",
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
    title: "Conservative",
    id: "AaveV3Supply",
    apy: 4.5,
    risk: "low",
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
    title: "OptLend",
    id: "MorphoSupply",
    apy: 8.5,
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
    title: "Enhanced",
    id: "AaveV3SupplyLeveraged",
    apy: 8.0,
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
    title: "Dynamic",
    id: "FluidSupply",
    apy: 5.7,
    risk: "low",
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
    title: "Loooper",
    id: "IporFusionSupply",
    apy: 18.9,
    risk: "high",
    color: "#00D4AA",
    protocol: IPOR,
    description:
      "Automated USDC looping strategy on IPOR Fusion delivering maximized yields through efficient leverage management.",
    fullDescription:
      "IPOR Fusion's yoUSD Loooper employs an automated looping strategy to maximize USDC yields on Base network. The protocol automatically manages leverage positions to optimize returns while maintaining risk parameters. Currently delivering 18.9% APY with $1.28M TVL.",
    externalLink: "https://app.ipor.io/fusion/base/0x1166250d1d6b5a1dbb73526257f6bb2bbe235295",
    learnMoreLink: "https://docs.ipor.io/",
    tokens: [USDC],
    chainId: base.id,
    status: "active",
  },
  {
    title: "Perps Vault",
    id: "AvantisVaultSupply",
    apy: 20.2,
    risk: "high",
    color: "#FF6B35",
    protocol: AVANTIS,
    description:
      "Earn yield from perpetuals trading fees by providing liquidity to the Avantis vault. Vault acts as counterparty to traders.",
    fullDescription:
      "Supply USDC to the Avantis perpetuals vault and earn ~20% APY from trading fees. The vault acts as the counterparty to traders on the Avantis perpetuals platform. $106M TVL with battle-tested smart contracts. Note: 0.5% fee applies on withdrawals.",
    externalLink: "https://www.avantisfi.com/earn/avantis-vault",
    learnMoreLink: "https://docs.avantisfi.com/",
    tokens: [USDC],
    chainId: base.id,
    status: "active",
  },
  {
    title: "40 Acres",
    id: "HarvestFortyAcresUSDC",
    apy: 11.5,
    risk: "medium",
    color: "#FFAA00",
    protocol: HARVEST,
    description:
      "Automated yield farming with Harvest Finance's flagship 40 Acres USDC vault. Instant withdrawals with no fees.",
    fullDescription:
      "Supply USDC to Harvest Finance's 40 Acres vault for automated yield optimization across Base DeFi protocols. The vault automatically compounds rewards and rebalances strategies to maximize returns. $2.85M TVL with proven track record. Features instant 1-step withdrawals with no deposit or withdrawal fees.",
    externalLink: "https://app.harvest.finance/base/0xC777031D50F632083Be7080e51E390709062263E",
    learnMoreLink: "https://docs.harvest.finance/",
    tokens: [USDC],
    chainId: base.id,
    status: "active",
  },
  {
    title: "Autopilot",
    id: "HarvestAutopilotUSDC",
    apy: 7.54,
    risk: "low",
    color: "#FFD700",
    protocol: HARVEST,
    description:
      "Conservative yield farming with Harvest Finance's Autopilot USDC vault. Stable returns with instant liquidity.",
    fullDescription:
      "Supply USDC to Harvest Finance's Autopilot vault for steady, low-risk yields on Base network. This conservative strategy focuses on stable returns with minimal volatility. $1.82M TVL with consistent performance history. Features instant 1-step withdrawals with no deposit or withdrawal fees.",
    externalLink: "https://app.harvest.finance/base/0x0d877Dc7C8Fa3aD980DfDb18B48eC9F8768359C4",
    learnMoreLink: "https://docs.harvest.finance/",
    tokens: [USDC],
    chainId: base.id,
    status: "active",
  },
  {
    title: "AAVE/USDC-Celo",
    id: "StCeloStaking",
    apy: 3.3,
    risk: "low",
    color: "#35D07F",
    protocol: AAVE,
    description:
      "Supply USDC to AAVE V3 on Celo network to earn lending interest with sub-cent transaction costs and fast finality.",
    fullDescription:
      "Supply USDC to AAVE V3 lending protocol on Celo network. AAVE is a battle-tested DeFi protocol with over $10B in TVL. Earn competitive yields on your USDC holdings with 1-second transaction finality and minimal fees on Celo's eco-friendly blockchain.",
    externalLink: "https://app.aave.com/reserve-overview/?underlyingAsset=0xceba9300f2b948710d2653dd7b07f33a8b32118c&marketName=proto_celo_v3",
    learnMoreLink: "https://docs.aave.com/",
    tokens: [USDC],
    chainId: celo.id,
    status: "active",
  },
  {
    title: "AAVE/Celo",
    id: "AaveV3SupplyCelo",
    apy: 2.5,
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
    title: "AAVE/USDT-Celo",
    id: "AaveV3SupplyUSDTCelo",
    apy: 1.01,
    risk: "low",
    color: "#9896FF",
    protocol: AAVE,
    description:
      "Supply USDT to AAVE V3 on Celo network to earn lending interest with minimal fees and fast finality.",
    fullDescription:
      "Supply USDT (Tether) to AAVE V3 lending protocol on Celo network. AAVE is a battle-tested DeFi protocol with over $10B in TVL. Earn stable yields on your USDT holdings with $6.97M TVL, 1-second transaction finality and sub-cent transaction costs.",
    externalLink: "https://app.aave.com/reserve-overview/?underlyingAsset=0x48065fbbe25f71c9282ddf5e1cd6d6a887483d5e&marketName=proto_celo_v3",
    learnMoreLink: "https://docs.aave.com/",
    tokens: [USDT],
    chainId: celo.id,
    status: "active",
  },
  {
    title: "AAVE/BNB",
    id: "AaveV3SupplyBSC",
    apy: 1.6,
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
  {
    title: "AAVE/USDC-Poly",
    id: "AaveV3SupplyPolygon",
    apy: 3.8,
    risk: "medium",
    color: "#9896FF",
    protocol: AAVE,
    description:
      "Supply USDC to AAVE V3 on Polygon network to earn lending interest with fast transactions and low fees.",
    fullDescription:
      "Supply USDC to AAVE V3 lending protocol on Polygon network. AAVE is a battle-tested DeFi protocol with over $43B in global TVL. Earn competitive yields on your USDC holdings with Polygon's fast finality and minimal gas costs.",
    externalLink: "https://app.aave.com/markets/?marketName=proto_polygon_v3",
    learnMoreLink: "https://docs.aave.com/",
    tokens: [USDC],
    chainId: polygon.id,
    status: "active",
  },
  {
    title: "AAVE/USDC-Arb",
    id: "AaveV3SupplyArbitrum",
    apy: 4.2,
    risk: "medium",
    color: "#9896FF",
    protocol: AAVE,
    description:
      "Supply USDC to AAVE V3 on Arbitrum network to earn lending interest with Ethereum security and low fees.",
    fullDescription:
      "Supply USDC to AAVE V3 lending protocol on Arbitrum network. AAVE is a battle-tested DeFi protocol with over $43B in global TVL. Earn competitive yields on your USDC holdings with Arbitrum's Ethereum-grade security and cost efficiency.",
    externalLink: "https://app.aave.com/markets/?marketName=proto_arbitrum_v3",
    learnMoreLink: "https://docs.aave.com/",
    tokens: [USDC],
    chainId: arbitrum.id,
    status: "active",
  },
  {
    title: "Flow LST",
    id: "AnkrFlowStaking",
    apy: 10.8,
    risk: "low",
    color: "#00EF8B",
    protocol: ANKR,
    description:
      "Stake FLOW tokens with Ankr to earn staking rewards while maintaining liquidity through ankrFLOW tokens.",
    fullDescription:
      "Stake FLOW tokens through Ankr's liquid staking protocol to earn 10.8% APY while receiving ankrFLOW tokens that can be used across DeFi. Ankr is a leading liquid staking provider with billions in TVL, offering secure and efficient staking solutions.",
    externalLink: "https://www.ankr.com/staking-crypto/flow-flowevm/",
    learnMoreLink: "https://www.ankr.com/docs/staking/liquid-staking/flow/",
    tokens: [FLOW],
    chainId: flowMainnet.id,
    status: "active",
  },
];

// Coming Soon strategies (other chains and protocols)
export const COMING_SOON_STRATEGIES: StrategyMetadata[] = [];

// Combined strategies metadata - Base network focus
export const STRATEGIES_METADATA: StrategyMetadata[] = [
  ...ACTIVE_STRATEGIES,
  ...COMING_SOON_STRATEGIES,
];
