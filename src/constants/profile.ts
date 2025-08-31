import { bsc, celo, flowMainnet, base, arbitrum, polygon, mainnet } from "viem/chains";

import {
  CELO,
  FLOW,
  BNB,
  USDT,
  USDC,
  ETH,
  wbETH,
  wstETH,
  cEUR,
} from "@/constants/coins";
import { Token } from "@/types";
import type { SupportedChainIds } from "@/providers/config";

// Define SUPPORTED_TOKENS with the correct type annotation
export const SUPPORTED_TOKENS: Record<SupportedChainIds, Token[]> = {
  [mainnet.id]: [ETH, USDC], // Ethereum Mainnet
  [polygon.id]: [USDT, USDC], // Polygon
  [arbitrum.id]: [ETH, USDT, USDC, wstETH], // Arbitrum
  [base.id]: [USDC], // Base - Only USDC for DynaVest strategies
  [bsc.id]: [BNB, USDT, USDC, wbETH], // BSC
  [celo.id]: [CELO, cEUR], // Celo
  [flowMainnet.id]: [FLOW, USDT, USDC], // Flow
};
