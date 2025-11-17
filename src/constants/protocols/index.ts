import { AAVE } from "./aave";
import { UNISWAP } from "./uniswap";
import { MORPHO } from "./morpho";
import { FLUID } from "./fluid";
import { LIDO } from "./lido";
import { GMX } from "./gmx";
import { CAMELOT } from "./camelot";
import { ST_CELO } from "./stCelo";
import { IPOR } from "./ipor";
import { AVANTIS } from "./avantis";
import { HARVEST } from "./harvest";


export * from "./aave";
export * from "./stCelo";
export * from "./ankr";
export * from "./asterdex";
export * from "./morpho";
export * from "./camelot";
export * from "./uniswap";
export * from "./gmx";
export * from "./lido";
export * from "./fluid";
export * from "./ipor";
export * from "./avantis";
export * from "./harvest";


// Active protocols on Base network
export const PROTOCOLS = [AAVE, UNISWAP, MORPHO, FLUID, IPOR, AVANTIS, HARVEST];

// Coming soon protocols
export const COMING_SOON_PROTOCOLS = [LIDO, GMX, CAMELOT, ST_CELO];
