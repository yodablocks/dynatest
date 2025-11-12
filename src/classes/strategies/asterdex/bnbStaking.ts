import { Position } from "@/types/position";
import type { Address } from "viem";
import { encodeFunctionData, formatUnits } from "viem";
import { readContract } from "@wagmi/core";
import { GetProtocolChains } from "@/types/strategies";

import { ASTERDEX_BNB_STAKING_ABI } from "@/constants/abis/asterdexBNBStaking";
import { BaseStrategy, StrategyCall } from "../baseStrategy";
import { ASTERDEX } from "@/constants/protocols/asterdex";
import { coreWagmiConfig } from "@/providers/config";
import { getTokenByName } from "@/utils/coins";

export class AsterdexBNBStaking extends BaseStrategy<typeof ASTERDEX> {
  constructor(chainId: GetProtocolChains<typeof ASTERDEX>) {
    super(chainId, ASTERDEX, "AsterdexBNBStaking");
  }

  async investCalls(
    amount: bigint,
    user: Address,
    asset?: Address
  ): Promise<StrategyCall[]> {
    const minting = this.getAddress("minting");

    // For Asterdex, we deposit BNB directly to receive asBNB tokens
    return [
      {
        to: minting,
        value: amount,
        data: encodeFunctionData({
          abi: ASTERDEX_BNB_STAKING_ABI,
          functionName: "deposit",
          args: [],
        }),
      },
    ];
  }

  async redeemCalls(
    amount: bigint,
    user: Address,
    asset?: Address
  ): Promise<StrategyCall[]> {
    const minting = this.getAddress("minting");
    const asBNB = this.getAddress("asBNB");

    try {
      // Get user's asBNB balance
      const asBNBBalance = await readContract(coreWagmiConfig, {
        chainId: this.chainId,
        abi: ASTERDEX_BNB_STAKING_ABI,
        address: asBNB,
        functionName: "balanceOf",
        args: [user],
      });

      return [
        {
          to: minting,
          data: encodeFunctionData({
            abi: ASTERDEX_BNB_STAKING_ABI,
            functionName: "withdraw",
            args: [asBNBBalance],
          }),
        },
      ];
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      throw new Error(`AsterdexBNBStaking redeemCalls failed: ${errorMessage}`);
    }
  }

  async getProfit(user: Address, position: Position): Promise<number> {
    try {
      const { amount, tokenName } = position;
      const token = getTokenByName(tokenName);
      const asBNB = this.getAddress("asBNB");
      const minting = this.getAddress("minting");

      // Get user's asBNB balance
      const asBNBBalance = await readContract(coreWagmiConfig, {
        chainId: this.chainId,
        abi: ASTERDEX_BNB_STAKING_ABI,
        address: asBNB,
        functionName: "balanceOf",
        args: [user],
      });

      // Convert asBNB to BNB to get current value
      const bnbValue = await readContract(coreWagmiConfig, {
        chainId: this.chainId,
        abi: ASTERDEX_BNB_STAKING_ABI,
        address: minting,
        functionName: "convertToAssets",
        args: [asBNBBalance],
      });

      // Calculate profit: current value - initial amount
      return Number(formatUnits(bnbValue, token.decimals)) - amount;
    } catch (error) {
      console.error("AsterdexBNBStaking getProfit error:", error);
      return 0; // Return 0 profit on error instead of throwing
    }
  }

  /**
   * Validate if current chain is supported by this strategy
   */
  static isChainSupported(chainId: number): boolean {
    return chainId in ASTERDEX.contracts;
  }
}
