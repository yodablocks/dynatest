import { bsc, celo, flowMainnet, base, arbitrum, polygon, mainnet } from "viem/chains";
import { hyperEvm } from "@/providers/config";

import {
  CELO,
  FLOW,
  BNB,
  USDT,
  USDC,
  ETH,
  WETH,
  wbETH,
  wstETH,
  cEUR,
  cbBTC,
  WBNB,
  GRAIL,
  xGRAIL,
  HYPE,
  USDT0,
} from "@/constants/coins";
import { Token } from "@/types";
import type { SupportedChainIds } from "@/providers/config";

// Define SUPPORTED_TOKENS with the correct type annotation
export const SUPPORTED_TOKENS: Record<SupportedChainIds, Token[]> = {
  [mainnet.id]: [ETH, USDC, WETH], // Ethereum Mainnet
  [polygon.id]: [USDT, USDC], // Polygon
  [arbitrum.id]: [ETH, USDT, USDC, wstETH, WETH, GRAIL, xGRAIL], // Arbitrum
  [base.id]: [ETH, USDC, USDT, WETH, wstETH, cbBTC], // Base - Expanded to include common Base tokens
  [bsc.id]: [BNB, USDT, USDC, wbETH, WBNB], // BSC
  [celo.id]: [CELO, cEUR], // Celo
  [flowMainnet.id]: [FLOW, USDT, USDC], // Flow
  [hyperEvm.id]: [HYPE, USDC, USDT0], // HyperEVM - HYPE is native, USDC for deposits, USDT0 for swaps
};
