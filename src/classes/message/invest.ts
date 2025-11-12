import { Message, MessageMetadata } from "./base";
import { PortfolioMessage } from "./portfolio";
import {
  RiskLevel,
  RiskPortfolioStrategies,
  StrategiesSet,
} from "@/types";
import { RISK_OPTIONS } from "@/constants/risk";
import { base } from "viem/chains";
import { portfolioAllocationService } from "@/services/portfolioAllocationService";

export class InvestMessage extends Message {
  public amount: string = "0";
  public chain: number = base.id;

  constructor(metadata: MessageMetadata, _chain?: number) {
    super(metadata);
    if (_chain) {
      this.chain = _chain;
    }
  }

  /**
   * Get strategies dynamically based on risk level and current APY
   * This replaces the old hardcoded approach with dynamic selection
   */
  private getStrategiesSetByChain(
    chainId: number,
    liveAPYData?: Map<string, number>
  ): StrategiesSet {
    // Only support Base chain for now
    if (chainId !== base.id) {
      throw new Error(
        `Chain ${chainId} is not supported yet. Currently only Base chain is supported for portfolio building.`
      );
    }

    // Create strategies set object
    const strategiesSet: StrategiesSet = {} as StrategiesSet;

    // For each risk level, get the best strategies dynamically
    RISK_OPTIONS.forEach((riskLevel) => {
      // Get best strategies for this risk level
      const strategies = portfolioAllocationService.getBestStrategiesForRisk(
        riskLevel,
        chainId,
        liveAPYData
      );

      // Calculate allocations for these strategies
      const allocations =
        portfolioAllocationService.calculateAllocations(strategies);

      // Map strategies to RiskPortfolioStrategies with allocations
      strategiesSet[riskLevel] = strategies.map((strategy, i) => ({
        ...strategy,
        allocation: allocations[i] || 0,
      })) as RiskPortfolioStrategies[];
    });

    return strategiesSet;
  }

  next(): Message {
    // TODO: Optionally fetch live APY data here
    // For now, using hardcoded APY from STRATEGIES_METADATA
    // In future: const liveAPYData = await fetchLiveAPYData();

    // Get strategies filtered by chain with dynamic selection
    const strategiesSet = this.getStrategiesSetByChain(this.chain);

    console.log("Dynamic portfolio allocation:", strategiesSet);

    return new PortfolioMessage(
      this.createDefaultMetadata(`Portfolio: ${this.amount} USDC`),
      this.amount,
      this.chain,
      strategiesSet
    );
  }
}
