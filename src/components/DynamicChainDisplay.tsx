// components/DynamicChainDisplay.tsx
import Image from "next/image";
import { useChainId } from "wagmi";
import { base, mainnet } from "viem/chains";
import { getChain } from "@/constants/chains";
import type { StrategyMetadata } from "@/types";

interface DynamicChainDisplayProps {
  strategy: StrategyMetadata;
  size?: number;
  showChainName?: boolean;
  className?: string;
}

/**
 * Dynamic chain display component for cross-chain strategies like "Institutional USDC"
 * Shows Base logo when user is on Base (can invest directly)
 * Shows Ethereum logo when indicating destination/deployment chain
 */
export function DynamicChainDisplay({ 
  strategy, 
  size = 24, 
  showChainName = false,
  className = "" 
}: DynamicChainDisplayProps) {
  const currentChainId = useChainId();
  
  // Special handling for cross-chain strategies that use CCTP bridge
  const isInstitutionalUSDC = strategy.title === "Institutional USDC";
  const isAlphaGeneration = strategy.title === "Alpha Generation";
  const isCCTPStrategy = isInstitutionalUSDC || isAlphaGeneration;
  
  let displayChainId: number;
  let displayText: string | undefined;
  
  if (isCCTPStrategy) {
    // For CCTP strategies: show current chain if user is on Base, otherwise show destination (Ethereum)
    if (currentChainId === base.id) {
      displayChainId = base.id;
      displayText = showChainName ? "Available on Base" : undefined;
    } else {
      displayChainId = mainnet.id; // Ethereum mainnet
      displayText = showChainName ? "Deploys to Ethereum" : undefined;
    }
  } else {
    // For other strategies: show the strategy's native chain
    displayChainId = strategy.chainId;
    displayText = showChainName ? getChain(displayChainId)?.name : undefined;
  }
  
  const displayChain = getChain(displayChainId);
  
  if (!displayChain) {
    return null;
  }
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src={displayChain.icon}
        alt={displayChain.name}
        width={size}
        height={size}
        className="rounded-full"
      />
      {displayText && (
        <span className="text-sm text-gray-600">{displayText}</span>
      )}
    </div>
  );
}

// Extended version with tooltip for better UX
interface DynamicChainDisplayWithTooltipProps extends DynamicChainDisplayProps {
  showTooltip?: boolean;
}

export function DynamicChainDisplayWithTooltip({ 
  strategy, 
  showTooltip = true,
  ...props 
}: DynamicChainDisplayWithTooltipProps) {
  const currentChainId = useChainId();
  const isInstitutionalUSDC = strategy.title === "Institutional USDC";
  const isAlphaGeneration = strategy.title === "Alpha Generation";
  const isCCTPStrategy = isInstitutionalUSDC || isAlphaGeneration;
  
  let tooltipText: string | undefined;
  
  if (isCCTPStrategy && showTooltip) {
    if (currentChainId === base.id) {
      tooltipText = "Invest directly from Base via CCTP bridge to Ethereum";
    } else {
      tooltipText = "Strategy deploys to Ethereum mainnet";
    }
  }
  
  const display = <DynamicChainDisplay strategy={strategy} {...props} />;
  
  if (tooltipText) {
    return (
      <div title={tooltipText} className="cursor-help">
        {display}
      </div>
    );
  }
  
  return display;
}
