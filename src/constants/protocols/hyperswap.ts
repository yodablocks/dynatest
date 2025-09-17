import { hyperEvm } from "@/providers/config";
import type { Protocol } from "@/types/strategies";

export const HYPERSWAP = {
  name: "HyperSwap",
  description: "Native DEX on Hyperliquid's HyperEVM with concentrated liquidity and MEV protection",
  icon: "/crypto-icons/protocol/hyperswap.svg",
  link: "https://app.hyperliquid.xyz",
  contracts: {
    [hyperEvm.id]: {
      pool: "0x...", // TODO: Add actual HyperSwap pool contract
      router: "0x...", // TODO: Add actual HyperSwap router contract
    },
  },
} as const satisfies Protocol;
