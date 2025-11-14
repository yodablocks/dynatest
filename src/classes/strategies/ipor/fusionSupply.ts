import { Position } from "@/types/position";
import type { Address } from "viem";
import { encodeFunctionData, formatUnits } from "viem";
import { readContract } from "@wagmi/core";
import { GetProtocolChains } from "@/types/strategies";

import { IPOR_FUSION_ABI, ERC20_ABI } from "@/constants/abis";
import { BaseStrategy, StrategyCall } from "../baseStrategy";
import { IPOR } from "@/constants/protocols/ipor";
import { coreWagmiConfig } from "@/providers/config";
import { getTokenByName } from "@/utils/coins";

export class IporFusionSupply extends BaseStrategy<typeof IPOR> {
  constructor(chainId: GetProtocolChains<typeof IPOR>) {
    super(chainId, IPOR, "IporFusionSupply");
  }

  async investCalls(
    amount: bigint,
    user: Address,
    asset?: Address
  ): Promise<StrategyCall[]> {
    if (!asset) {
      throw new Error("IporFusionSupply: asset address is required");
    }

    const vault = this.getAddress("yoUSDVault");

    return [
      {
        to: asset,
        data: encodeFunctionData({
          abi: ERC20_ABI,
          functionName: "approve",
          args: [vault, amount],
        }),
      },
      {
        to: vault,
        data: encodeFunctionData({
          abi: IPOR_FUSION_ABI,
          functionName: "deposit",
          args: [amount, user],
        }),
      },
    ];
  }

  async redeemCalls(
    amount: bigint,
    user: Address,
    underlyingAsset?: Address
  ): Promise<StrategyCall[]> {
    if (!underlyingAsset) {
      throw new Error("IporFusionSupply: asset is required");
    }

    const vault = this.getAddress("yoUSDVault");

    try {
      // Get user's vault share balance
      const shareBalance = await readContract(coreWagmiConfig, {
        chainId: this.chainId,
        abi: IPOR_FUSION_ABI,
        address: vault,
        functionName: "balanceOf",
        args: [user],
      });

      return [
        {
          to: vault,
          data: encodeFunctionData({
            abi: IPOR_FUSION_ABI,
            functionName: "redeem",
            args: [shareBalance, user, user],
          }),
        },
      ];
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      throw new Error(`IporFusionSupply redeemCalls failed: ${errorMessage}`);
    }
  }

  async getProfit(user: Address, position: Position) {
    try {
      const { amount, tokenName } = position;
      const token = getTokenByName(tokenName);
      const vault = this.getAddress("yoUSDVault");

      // Get user's share balance
      const shareBalance = await readContract(coreWagmiConfig, {
        chainId: this.chainId,
        abi: IPOR_FUSION_ABI,
        address: vault,
        functionName: "balanceOf",
        args: [user],
      });

      // Convert shares to underlying assets
      const assetsValue = await readContract(coreWagmiConfig, {
        chainId: this.chainId,
        abi: IPOR_FUSION_ABI,
        address: vault,
        functionName: "convertToAssets",
        args: [shareBalance],
      });

      return Number(formatUnits(assetsValue, token.decimals)) - amount;
    } catch (error) {
      console.error("IporFusionSupply getProfit error:", error);
      return 0;
    }
  }

  /**
   * Validate if current chain is supported by this strategy
   */
  static isChainSupported(chainId: number): boolean {
    return chainId in IPOR.contracts;
  }
}
