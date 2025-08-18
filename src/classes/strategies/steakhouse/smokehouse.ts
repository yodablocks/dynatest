import { Address, encodeFunctionData } from "viem";
import { readContract } from "@wagmi/core";
import { base, mainnet } from "viem/chains";

import { MORPHO } from "@/constants/protocols/morpho";
import { ERC20_ABI } from "@/constants/abis/erc20";
import { METAMORPHO_ABI } from "@/constants/abis/metamorpho";
import { BaseStrategy, StrategyCall } from "../baseStrategy";
import { Position } from "@/types/position";
import { wagmiConfig as config } from "@/providers/config";
import { GetProtocolChains } from "@/types/strategies";
import { generateCCTPBridgeCalls, isCCTPBridgeRequired } from "@/utils/cctp";

/**
 * @notice SmokehouseStrategy is a strategy that allows users to supply USDC to an institutional-grade MetaMorpho vault
 * @notice Curated with professional risk management and zero bad debt record
 */
export class SmokehouseStrategy extends BaseStrategy<typeof MORPHO> {
  private readonly VAULT_ADDRESS = "0xBEeFFF209270748ddd194831b3fa287a5386f5bC";

  constructor(chainId: GetProtocolChains<typeof MORPHO>) {
    super(chainId, MORPHO, "SmokehouseStrategy");
  }

  async investCalls(
    amount: bigint,
    user: Address,
    asset?: Address,
    userChainId?: number
  ): Promise<StrategyCall[]> {
    if (!asset)
      throw new Error("SmokehouseStrategy: asset parameter is required");

    // Check if CCTP bridge is required
    if (userChainId && isCCTPBridgeRequired(this.chainId, userChainId)) {
      // Generate CCTP bridge calls to move USDC from Base to Ethereum
      const bridgeCalls = generateCCTPBridgeCalls(amount, user, asset, userChainId);
      
      // Return bridge calls - user will need to execute these first
      // Then they can execute the actual investment calls on Ethereum
      return bridgeCalls.map(call => ({
        to: call.to,
        data: call.data,
      }));
    }

    // Standard investment calls for when user is already on Ethereum
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
      console.error("Error calculating Smokehouse profit:", error);
      
      // Fallback: estimate based on time and expected APY
      const { createAt } = position;
      const now = new Date();
      const createdAt = new Date(createAt);
      const diffTime = Math.abs(now.getTime() - createdAt.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Estimated APY based on Steakhouse historical performance (~5-7%)
      const estimatedAPY = 0.06; // 6%
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
   * Check if CCTP bridge is required from user's current chain
   */
  requiresBridge(userChainId: number): boolean {
    return isCCTPBridgeRequired(this.chainId, userChainId);
  }

  /**
   * Generate CCTP bridge calls for cross-chain investment
   */
  async generateBridgeCalls(
    amount: bigint,
    user: Address,
    asset: Address,
    userChainId: number
  ): Promise<StrategyCall[]> {
    if (!this.requiresBridge(userChainId)) {
      throw new Error("Bridge not required for this chain combination");
    }

    const bridgeCalls = generateCCTPBridgeCalls(amount, user, asset, userChainId);
    return bridgeCalls.map(call => ({
      to: call.to,
      data: call.data,
    }));
  }

  /**
   * Get bridge information for UI display
   */
  getBridgeInfo(userChainId: number) {
    const requiresBridge = this.requiresBridge(userChainId);
    
    return {
      required: requiresBridge,
      sourceChain: userChainId,
      destinationChain: this.chainId,
      bridgeType: "cctp" as const,
      estimatedTime: 2, // minutes
      sourceName: userChainId === base.id ? "Base" : "Unknown",
      destinationName: "Ethereum",
    };
  }
}
