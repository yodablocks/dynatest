import { AAVE } from "./aave";
import { UNISWAP } from "./uniswap";
import { MORPHO } from "./morpho";
import { FLUID } from "./fluid";
import { LIDO } from "./lido";
import { GMX } from "./gmx";
import { CAMELOT } from "./camelot";
import { ST_CELO } from "./stCelo";
import { SMOKEHOUSE } from "./smokehouse";
import { HYPERSWAP } from "./hyperswap";

export * from "./aave";
export * from "./stCelo";
export * from "./ankr";
export * from "./kitty";
export * from "./morpho";
export * from "./camelot";
export * from "./uniswap";
export * from "./gmx";
export * from "./lido";
export * from "./fluid";
export * from "./smokehouse";
export * from "./hyperswap";

// Active protocols on Base network
export const PROTOCOLS = [AAVE, UNISWAP, MORPHO, FLUID];

// Ethereum protocols
export const ETHEREUM_PROTOCOLS = [SMOKEHOUSE];

// High-yield protocols (new networks)
export const HIGH_YIELD_PROTOCOLS = [HYPERSWAP];

// Coming soon protocols
export const COMING_SOON_PROTOCOLS = [LIDO, GMX, CAMELOT, ST_CELO];
