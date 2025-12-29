import { mantle } from "wagmi/chains";
import type { Protocol } from "@/types/strategies";

/**
 * Lendle Protocol - Lending protocol on Mantle Network
 * https://app.lendle.xyz
 */
export const LENDLE = {
  name: "Lendle",
  description: "Lendle - Advanced Lending Protocol on Mantle Network",
  icon: "/crypto-icons/protocol/lendle.svg",
  link: "https://app.lendle.xyz/",
  contracts: {
    [mantle.id]: {  // ✅ This is the key - add mantle to contracts
      pool: "0x5f7f6a70C9cCfb60Cdb4C8eB1ec0e5cdBf47b39B",
    },
  },
} as const satisfies Protocol;
