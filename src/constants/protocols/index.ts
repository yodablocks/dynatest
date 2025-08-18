import { AAVE } from "./aave";
import { UNISWAP } from "./uniswap";
import { MORPHO } from "./morpho";
import { FLUID } from "./fluid";
import { LIDO } from "./lido";
import { GMX } from "./gmx";
import { CAMELOT } from "./camelot";
import { ST_CELO } from "./stCelo";
import { SMOKEHOUSE } from "./smokehouse";

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

// Active protocols on Base network
export const PROTOCOLS = [AAVE, UNISWAP, MORPHO, FLUID];

// Ethereum protocols
export const ETHEREUM_PROTOCOLS = [SMOKEHOUSE];

// Coming soon protocols
export const COMING_SOON_PROTOCOLS = [LIDO, GMX, CAMELOT, ST_CELO];
