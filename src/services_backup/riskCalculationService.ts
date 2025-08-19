import type { StrategyMetadata, RiskLevel } from "@/types";

/**
 * Research-backed risk calculation service based on Exponential DeFi methodology
 * and academic research on DeFi risk assessment
 */

// Protocol risk scores based on battle-testing, audits, and maturity
const PROTOCOL_RISK_SCORES = {
  'AAVE': 0.1,      // Battle-tested, multiple audits, established
  'Morpho': 0.3,    // Newer but institutional backing, growing reputation
  'Fluid': 0.6,     // Newest protocol, less battle-tested
  'Lido': 0.2,      // Established liquid staking protocol
  'Uniswap': 0.15,  // Battle-tested DEX protocol
} as const;

// Chain risk scores based on security, decentralization, and maturity
const CHAIN_RISK_SCORES = {
  1: 0.1,        // Ethereum - most secure and decentralized
  8453: 0.2,     // Base - newer L2 but backed by Coinbase
  42161: 0.25,   // Arbitrum - established L2
  137: 0.3,      // Polygon - more centralized
  56: 0.4,       // BSC - more centralized
} as const;

// Strategy type risk multipliers based on complexity and leverage
const STRATEGY_TYPE_RISK = {
  // Low complexity strategies
  'supply': 0.1,           // Simple lending/supply
  'staking': 0.15,         // Native token staking
  
  // Medium complexity strategies
  'vault': 0.3,            // Managed vault strategies
  'liquidity': 0.4,        // Liquidity provision
  'farming': 0.45,         // Yield farming
  
  // High complexity strategies
  'leveraged': 0.7,        // Leveraged positions
  'derivatives': 0.8,      // Options, futures, etc.
  'bridge': 0.85,          // Cross-chain operations
  'algorithmic': 0.9,      // Algorithmic strategies
} as const;

// APY risk thresholds based on research data
const APY_RISK_CONFIG = {
  SAFE_APY_FLOOR: 4.0,     // Below this is considered very safe
  MODERATE_APY_CEILING: 20.0, // Above this is considered very risky
  HIGH_RISK_THRESHOLD: 15.0,  // Above this starts getting risky
};

// Risk calculation weights based on academic research (F-AHP study)
const RISK_WEIGHTS = {
  PROTOCOL: 0.40,    // Technical risks are most significant
  APY: 0.25,         // APY level indicates underlying risk
  CHAIN: 0.20,       // Blockchain security and maturity
  STRATEGY: 0.15,    // Strategy complexity and type
};

// Risk level thresholds based on Exponential DeFi letter grades
const RISK_THRESHOLDS = {
  LOW: 0.33,         // A-B ratings (low risk)
  MEDIUM: 0.66,      // C-D ratings (medium risk)
  // Above 0.66 = HIGH // E-F ratings (high risk)
};

export interface RiskAssessment {
  level: RiskLevel;
  score: number;
  confidence: 'high' | 'medium' | 'low';
  factors: {
    protocol: number;
    apy: number;
    chain: number;
    strategy: number;
  };
  reasoning: string[];
  source: 'calculated' | 'fallback';
}

class RiskCalculationService {
  /**
   * Calculate dynamic risk level for a strategy based on multiple factors
   */
  calculateRisk(strategy: StrategyMetadata): RiskAssessment {
    try {
      const factors = this.calculateRiskFactors(strategy);
      const totalScore = this.calculateTotalRiskScore(factors);
      const level = this.scoreToRiskLevel(totalScore);
      const confidence = this.calculateConfidence(strategy);
      const reasoning = this.generateReasoning(strategy, factors);

      return {
        level,
        score: totalScore,
        confidence,
        factors,
        reasoning,
        source: 'calculated'
      };
    } catch (error) {
      console.warn('Risk calculation failed, using fallback:', error);
      return this.getFallbackRisk(strategy);
    }
  }

  /**
   * Calculate individual risk factors
   */
  private calculateRiskFactors(strategy: StrategyMetadata) {
    return {
      protocol: this.calculateProtocolRisk(strategy),
      apy: this.calculateAPYRisk(strategy.apy),
      chain: this.calculateChainRisk(strategy.chainId),
      strategy: this.calculateStrategyRisk(strategy)
    };
  }

  /**
   * Protocol risk based on security, audits, and maturity
   */
  private calculateProtocolRisk(strategy: StrategyMetadata): number {
    const protocolName = strategy.protocol.name;
    const baseRisk = PROTOCOL_RISK_SCORES[protocolName as keyof typeof PROTOCOL_RISK_SCORES] ?? 0.8;
    
    // Adjust for institutional backing (Morpho vaults)
    if (strategy.title.includes('Institutional') || strategy.title.includes('Professional')) {
      return Math.max(baseRisk - 0.1, 0.1); // Reduce risk for institutional grade
    }
    
    // Adjust for MEV/Alpha strategies (higher risk)
    if (strategy.title.includes('Alpha') || strategy.title.includes('MEV')) {
      return Math.min(baseRisk + 0.2, 1.0); // Increase risk for MEV strategies
    }
    
    return baseRisk;
  }

  /**
   * APY risk - higher APY generally indicates higher risk
   */
  private calculateAPYRisk(apy: number): number {
    const { SAFE_APY_FLOOR, MODERATE_APY_CEILING } = APY_RISK_CONFIG;
    
    if (apy <= SAFE_APY_FLOOR) return 0.0;
    if (apy >= MODERATE_APY_CEILING) return 1.0;
    
    // Exponential curve - risk increases faster at higher APYs
    const normalizedAPY = (apy - SAFE_APY_FLOOR) / (MODERATE_APY_CEILING - SAFE_APY_FLOOR);
    return Math.pow(normalizedAPY, 1.5); // Exponential scaling
  }

  /**
   * Chain risk based on security, decentralization, and maturity
   */
  private calculateChainRisk(chainId: number): number {
    return CHAIN_RISK_SCORES[chainId as keyof typeof CHAIN_RISK_SCORES] ?? 0.5;
  }

  /**
   * Strategy risk based on complexity, leverage, and type
   */
  private calculateStrategyRisk(strategy: StrategyMetadata): number {
    let strategyRisk = 0.3; // Base strategy risk
    
    // Analyze strategy title for risk indicators
    const title = strategy.title.toLowerCase();
    const description = strategy.description.toLowerCase();
    
    // Check for high-risk keywords
    if (title.includes('enhanced') || title.includes('leveraged') || description.includes('leverage')) {
      strategyRisk = Math.max(strategyRisk, STRATEGY_TYPE_RISK.leveraged);
    }
    
    if (title.includes('alpha') || title.includes('mev') || description.includes('mev')) {
      strategyRisk = Math.max(strategyRisk, STRATEGY_TYPE_RISK.algorithmic);
    }
    
    if (description.includes('bridge') || description.includes('cctp')) {
      strategyRisk = Math.max(strategyRisk, STRATEGY_TYPE_RISK.bridge);
    }
    
    // Check for lower-risk indicators
    if (title.includes('conservative') || description.includes('standard')) {
      strategyRisk = Math.min(strategyRisk, STRATEGY_TYPE_RISK.supply);
    }
    
    if (title.includes('institutional') && description.includes('professional')) {
      strategyRisk = Math.min(strategyRisk, STRATEGY_TYPE_RISK.vault);
    }
    
    return Math.min(strategyRisk, 1.0);
  }

  /**
   * Calculate total risk score using weighted factors
   */
  private calculateTotalRiskScore(factors: RiskAssessment['factors']): number {
    return (
      factors.protocol * RISK_WEIGHTS.PROTOCOL +
      factors.apy * RISK_WEIGHTS.APY +
      factors.chain * RISK_WEIGHTS.CHAIN +
      factors.strategy * RISK_WEIGHTS.STRATEGY
    );
  }

  /**
   * Convert risk score to risk level
   */
  private scoreToRiskLevel(score: number): RiskLevel {
    if (score <= RISK_THRESHOLDS.LOW) return 'low';
    if (score <= RISK_THRESHOLDS.MEDIUM) return 'medium';
    return 'high';
  }

  /**
   * Calculate confidence level based on available data
   */
  private calculateConfidence(strategy: StrategyMetadata): 'high' | 'medium' | 'low' {
    let confidenceScore = 0;
    
    // Protocol recognition
    if (PROTOCOL_RISK_SCORES[strategy.protocol.name as keyof typeof PROTOCOL_RISK_SCORES]) {
      confidenceScore += 0.3;
    }
    
    // Chain recognition
    if (CHAIN_RISK_SCORES[strategy.chainId as keyof typeof CHAIN_RISK_SCORES]) {
      confidenceScore += 0.2;
    }
    
    // Strategy description completeness
    if (strategy.description.length > 50) {
      confidenceScore += 0.2;
    }
    
    // External links available
    if (strategy.externalLink || strategy.learnMoreLink) {
      confidenceScore += 0.2;
    }
    
    // APY reasonableness
    if (strategy.apy >= 2 && strategy.apy <= 25) {
      confidenceScore += 0.1;
    }
    
    if (confidenceScore >= 0.7) return 'high';
    if (confidenceScore >= 0.4) return 'medium';
    return 'low';
  }

  /**
   * Generate human-readable reasoning for the risk assessment
   */
  private generateReasoning(strategy: StrategyMetadata, factors: RiskAssessment['factors']): string[] {
    const reasoning: string[] = [];
    
    // Protocol reasoning
    if (factors.protocol <= 0.2) {
      reasoning.push(`✅ ${strategy.protocol.name} is a well-established, battle-tested protocol`);
    } else if (factors.protocol <= 0.4) {
      reasoning.push(`⚠️ ${strategy.protocol.name} is a newer protocol with institutional backing`);
    } else {
      reasoning.push(`🔴 ${strategy.protocol.name} is a newer protocol with limited track record`);
    }
    
    // APY reasoning
    if (factors.apy <= 0.3) {
      reasoning.push(`✅ APY of ${strategy.apy}% is within conservative range`);
    } else if (factors.apy <= 0.6) {
      reasoning.push(`⚠️ APY of ${strategy.apy}% indicates moderate risk for higher returns`);
    } else {
      reasoning.push(`🔴 APY of ${strategy.apy}% is high, indicating significant risk`);
    }
    
    // Chain reasoning
    const chainName = strategy.chainId === 1 ? 'Ethereum' : strategy.chainId === 8453 ? 'Base' : 'Unknown';
    if (factors.chain <= 0.2) {
      reasoning.push(`✅ ${chainName} provides excellent security and decentralization`);
    } else if (factors.chain <= 0.4) {
      reasoning.push(`⚠️ ${chainName} is a newer chain with good security practices`);
    } else {
      reasoning.push(`🔴 ${chainName} has additional risks as a newer/less tested chain`);
    }
    
    // Strategy reasoning
    if (strategy.title.includes('Enhanced') || strategy.title.includes('Leveraged')) {
      reasoning.push(`🔴 Leveraged strategy amplifies both returns and risks`);
    }
    
    if (strategy.description.includes('institutional')) {
      reasoning.push(`✅ Professional institutional management reduces operational risk`);
    }
    
    if (strategy.description.includes('bridge') || strategy.description.includes('CCTP')) {
      reasoning.push(`⚠️ Cross-chain operations introduce additional complexity and risk`);
    }
    
    return reasoning;
  }

  /**
   * Fallback to hardcoded risk if calculation fails
   */
  private getFallbackRisk(strategy: StrategyMetadata): RiskAssessment {
    return {
      level: strategy.risk,
      score: strategy.risk === 'low' ? 0.2 : strategy.risk === 'medium' ? 0.5 : 0.8,
      confidence: 'low',
      factors: { protocol: 0.5, apy: 0.5, chain: 0.5, strategy: 0.5 },
      reasoning: ['Using hardcoded risk level due to calculation error'],
      source: 'fallback'
    };
  }

  /**
   * Get risk assessment for multiple strategies
   */
  calculateMultipleRisks(strategies: StrategyMetadata[]): Map<string, RiskAssessment> {
    const assessments = new Map<string, RiskAssessment>();
    
    for (const strategy of strategies) {
      assessments.set(strategy.id, this.calculateRisk(strategy));
    }
    
    return assessments;
  }

  /**
   * Get risk distribution statistics
   */
  getRiskDistribution(strategies: StrategyMetadata[]): {
    low: number;
    medium: number;
    high: number;
    averageScore: number;
  } {
    const assessments = Array.from(this.calculateMultipleRisks(strategies).values());
    const total = assessments.length;
    
    const distribution = assessments.reduce(
      (acc, assessment) => {
        acc[assessment.level]++;
        acc.totalScore += assessment.score;
        return acc;
      },
      { low: 0, medium: 0, high: 0, totalScore: 0 }
    );
    
    return {
      low: distribution.low / total,
      medium: distribution.medium / total,
      high: distribution.high / total,
      averageScore: distribution.totalScore / total,
    };
  }
}

// Export singleton instance
export const riskCalculationService = new RiskCalculationService();

// Export types and utilities
export { RiskCalculationService };
export type { RiskAssessment };
