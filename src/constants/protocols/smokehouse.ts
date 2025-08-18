import { mainnet } from "viem/chains";

import type { Protocol } from "@/types/strategies";

export const SMOKEHOUSE = {
  name: "Smokehouse",
  description:
    "Smokehouse is a MetaMorpho vault curated by Steakhouse Financial, offering secure USDC lending with zero bad debt record and institutional-grade risk management.",
  icon: "/crypto-icons/protocol/smokehouse.svg",
  link: "https://morpho.org/",
  contracts: {
    [mainnet.id]: {
      vault: "0xBEeFFF209270748ddd194831b3fa287a5386f5bC",
    },
  },
} as const satisfies Protocol;
