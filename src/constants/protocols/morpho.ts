import { base } from "viem/chains";

import type { Protocol } from "@/types/strategies";

export const MORPHO = {
  name: "Morpho",
  description:
    "Morpho is a decentralized lending protocol that allows users to lend and borrow assets.",
  icon: "/crypto-icons/protocol/morpho.svg",
  link: "https://morpho.org/",
  contracts: {
    [base.id]: {
      morpho: "0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb",
      re7Vault: "0x12AFDeFb2237a5963e7BAb3e2D46ad0eee70406e", // Re7 USDC vault
    },
  },
} as const satisfies Protocol;
