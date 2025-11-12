import { bsc } from "viem/chains";
import type { Protocol } from "@/types/strategies";

export const ASTERDEX_CONTRACTS = {
  [bsc.id]: {
    minting: "0x2F31ab8950c50080E77999fa456372f276952fD8",
    asBNB: "0x77734e70b6E88b4d82fE632a168EDf6e700912b6",
  },
} as const;

export const ASTERDEX = {
  name: "Asterdex",
  description:
    "Liquid staking protocol for BNB tokens on BNB Chain, offering asBNB liquid staking derivative with competitive yields.",
  icon: "/crypto-icons/chains/56.svg",
  link: "https://asterdex.com/",
  contracts: ASTERDEX_CONTRACTS,
} as const satisfies Protocol;
