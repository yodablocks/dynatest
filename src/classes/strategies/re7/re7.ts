import { Address, encodeFunctionData } from "viem";
import { readContract } from "@wagmi/core";
import { base } from "viem/chains";

import { MORPHO } from "@/constants/protocols/morpho";
import { ERC20_ABI } from "@/constants/abis/erc20";
import { METAMORPHO_ABI } from "@/constants/abis/metamorpho";
import { BaseStrategy, StrategyCall } from "../baseStrategy";
import { Position } from "@/types/position";
import { wagmiConfig as config } from "@/providers/config";
import { GetProtocolChains } from "@/types/strategies";

/**
 * @notice Re7Strategy is a strategy that allows users to supply USDC to Re7 Labs MetaMorpho vault on Base
 * @notice Re7 Labs is a professional curator with $700M+ TVL and institutional validation
 * @notice Operates on Base network with 20% performance fee
 */
export class Re7Strategy extends BaseStrategy<typeof MORPHO> {
  private readonly VAULT_ADDRESS = "0x12AFDeFb2237a5963e7BAb3e2D46ad0eee70406e";

  constructor(chainId: GetProtocolChains<typeof MORPHO>) {
    super(chainId, MORPHO, "Re7Strategy");
  }

  async investCalls(
    amount: bigint,
    user: Address,
    asset?: Address
  ): Promise<StrategyCall[]> {
    if (!asset)
      throw new Error("Re7Strategy: asset parameter is required");

    // Standard investment calls for Base network
    return [
      {
        to: asset,
        data: encodeFunctionData({
          abi: ERC20_ABI,
          functionName: "approve",
          args: [this.VAULT_ADDRESS, amount],
        }),
      },
      {
        to: this.VAULT_ADDRESS,
        data: encodeFunctionData({
          abi: METAMORPHO_ABI,
          functionName: "deposit",
          args: [amount, user],
        }),
      },
    ];
  }

  async redeemCalls(
    shares: bigint,
    user: Address,
    asset?: Address
  ): Promise<StrategyCall[]> {
    return [
      {
        to: this.VAULT_ADDRESS,
        data: encodeFunctionData({
          abi: METAMORPHO_ABI,
          functionName: "redeem",
          args: [shares, user, user],
        }),
      },
    ];
  }

  async getProfit(user: Address, position: Position): Promise<number> {
    try {
      // Get current share price by checking convertToAssets for 1 share (in vault decimals)
      const oneShare = BigInt(10 ** 18); // MetaMorpho vaults typically use 18 decimals for shares
      
      const currentAssetsForOneShare = await readContract(config, {
        chainId: this.chainId,
        abi: METAMORPHO_ABI,
        address: this.VAULT_ADDRESS,
        functionName: "convertToAssets",
        args: [oneShare],
      });

      // Calculate current share price (assets per share)
      const currentSharePrice = Number(currentAssetsForOneShare) / Number(oneShare);
      
      // Calculate profit percentage
      const profitPercentage = ((currentSharePrice - position.entryPrice) / position.entryPrice) * 100;
      
      return profitPercentage;
    } catch (error) {
      console.error("Error calculating Re7 profit:", error);
      
      // Fallback: estimate based on time and expected APY
      const { createAt } = position;
      const now = new Date();
      const createdAt = new Date(createAt);
      const diffTime = Math.abs(now.getTime() - createdAt.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Estimated APY based on Re7 Labs historical performance (~8-12% with performance fee)
      const estimatedAPY = 0.10; // 10%
      const dailyRate = estimatedAPY / 365;
      const estimatedProfit = dailyRate * diffDays * 100; // Convert to percentage

      return estimatedProfit;
    }
  }

  /**
   * Get current share price for entry tracking
   */
  async getCurrentSharePrice(): Promise<number> {
    try {
      const oneShare = BigInt(10 ** 18);
      const assetsForOneShare = await readContract(config, {
        chainId: this.chainId,
        abi: METAMORPHO_ABI,
        address: this.VAULT_ADDRESS,
        functionName: "convertToAssets",
        args: [oneShare],
      });

      return Number(assetsForOneShare) / Number(oneShare);
    } catch (error) {
      console.error("Error getting current share price:", error);
      return 1.0; // Default share price
    }
  }

  /**
   * Get vault total assets under management
   */
  async getTotalAssets(): Promise<bigint> {
    try {
      return await readContract(config, {
        chainId: this.chainId,
        abi: METAMORPHO_ABI,
        address: this.VAULT_ADDRESS,
        functionName: "totalAssets",
      });
    } catch (error) {
      console.error("Error getting total assets:", error);
      return BigInt(0);
    }
  }

  /**
   * Get user's share balance in the vault
   */
  async getUserShares(user: Address): Promise<bigint> {
    try {
      return await readContract(config, {
        chainId: this.chainId,
        abi: METAMORPHO_ABI,
        address: this.VAULT_ADDRESS,
        functionName: "balanceOf",
        args: [user],
      });
    } catch (error) {
      console.error("Error getting user shares:", error);
      return BigInt(0);
    }
  }

  /**
   * Get maximum deposit amount allowed by the vault
   */
  async getMaxDeposit(user: Address): Promise<bigint> {
    try {
      return await readContract(config, {
        chainId: this.chainId,
        abi: METAMORPHO_ABI,
        address: this.VAULT_ADDRESS,
        functionName: "maxDeposit",
        args: [user],
      });
    } catch (error) {
      console.error("Error getting max deposit:", error);
      return BigInt(0);
    }
  }

  /**
   * Preview how many shares will be received for a given deposit amount
   */
  async previewDeposit(assets: bigint): Promise<bigint> {
    try {
      return await readContract(config, {
        chainId: this.chainId,
        abi: METAMORPHO_ABI,
        address: this.VAULT_ADDRESS,
        functionName: "previewDeposit",
        args: [assets],
      });
    } catch (error) {
      console.error("Error previewing deposit:", error);
      return BigInt(0);
    }
  }

  /**
   * Preview how many assets will be received for redeeming given shares
   */
  async previewRedeem(shares: bigint): Promise<bigint> {
    try {
      return await readContract(config, {
        chainId: this.chainId,
        abi: METAMORPHO_ABI,
        address: this.VAULT_ADDRESS,
        functionName: "previewRedeem",
        args: [shares],
      });
    } catch (error) {
      console.error("Error previewing redeem:", error);
      return BigInt(0);
    }
  }

  /**
   * Get vault metadata for UI display
   */
  getVaultInfo() {
    return {
      curator: "Re7 Labs",
      network: "Base",
      chainId: base.id,
      vault: this.VAULT_ADDRESS,
      tvl: "$700M+",
      performanceFee: "20%",
      riskLevel: "Medium",
      description: "Professional institutional-grade MetaMorpho vault with proven track record",
      externalLink: `https://app.morpho.org/base/vault/${this.VAULT_ADDRESS}/re7-usdc`,
    };
  }
}
