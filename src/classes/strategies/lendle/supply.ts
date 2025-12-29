import { Position } from "@/types/position";
import type { Address } from "viem";
import { encodeFunctionData, formatUnits } from "viem";
import { readContract } from "@wagmi/core";
import { GetProtocolChains } from "@/types/strategies";

import { ERC20_ABI, LENDLE_POOL_ABI } from "@/constants/abis";
import { BaseStrategy, StrategyCall } from "../baseStrategy";
import { LENDLE } from "@/constants/protocols/lendle";
import { coreWagmiConfig } from "@/providers/config";
import { getTokenByName } from "@/utils/coins";

// Lendle Pool ABI (IPool interface - matches Aave V3 interface)
export class LendleSupply extends BaseStrategy<typeof LENDLE> {
  constructor(chainId: GetProtocolChains<typeof LENDLE>) {
    super(chainId, LENDLE, "LendleSupply");
  }

  async investCalls(
    amount: bigint,
    user: Address,
    asset?: Address
  ): Promise<StrategyCall[]> {
    if (!asset) {
      throw new Error("LendleSupply: asset is required");
    }

    const pool = this.getAddress("pool");

    return [
      {
        to: asset,
        data: encodeFunctionData({
          abi: ERC20_ABI,
          functionName: "approve",
          args: [pool, amount],
        }),
      },
      {
        to: pool,
        data: encodeFunctionData({
          abi: LENDLE_POOL_ABI,
          functionName: "supply",
          args: [asset, amount, user, 0], // referralCode = 0
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
      throw new Error("LendleSupply: asset is required");
    }

    const pool = this.getAddress("pool");

    try {
      const reserveData = await readContract(coreWagmiConfig, {
        chainId: this.chainId,
        abi: LENDLE_POOL_ABI,
        address: pool,
        functionName: "getReserveData",
        args: [underlyingAsset],
      });

      const aTokenAddress = (reserveData as any)[8]; // aTokenAddress is at index 8

      const aTokenBalance = await readContract(coreWagmiConfig, {
        chainId: this.chainId,
        abi: ERC20_ABI,
        address: aTokenAddress as Address,
        functionName: "balanceOf",
        args: [user],
      });

      return [
        {
          to: pool,
          data: encodeFunctionData({
            abi: LENDLE_POOL_ABI,
            functionName: "withdraw",
            args: [underlyingAsset, aTokenBalance, user],
          }),
        },
      ];
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      throw new Error(`LendleSupply redeemCalls failed: ${errorMessage}`);
    }
  }

  async getProfit(user: Address, position: Position) {
    try {
      const { amount, tokenName } = position;
      const token = getTokenByName(tokenName);
      const underlyingAsset = token.chains![this.chainId];
      const pool = this.getAddress("pool");

      const reserveData = await readContract(coreWagmiConfig, {
        chainId: this.chainId,
        abi: LENDLE_POOL_ABI,
        address: pool,
        functionName: "getReserveData",
        args: [underlyingAsset],
      });

      const aTokenAddress = (reserveData as any)[8];

      const aTokenBalance = await readContract(coreWagmiConfig, {
        chainId: this.chainId,
        abi: ERC20_ABI,
        address: aTokenAddress as Address,
        functionName: "balanceOf",
        args: [user],
      });

      return (
        Number(formatUnits(aTokenBalance, token.decimals)) - amount
      );
    } catch (error) {
      console.error("LendleSupply getProfit error:", error);
      return 0;
    }
  }

  static isChainSupported(chainId: number): boolean {
    return chainId in LENDLE.contracts;
  }
}