import { Address, encodeFunctionData } from "viem";
import { base, mainnet } from "viem/chains";

// CCTP Contract Addresses (Official Circle deployments)
export const CCTP_CONTRACTS = {
  [base.id]: {
    tokenMessenger: "0x1682Ae6375C4E4A97e4B583BC394c861A46D8962",
    messageTransmitter: "0xAD09780d193884d503182aD4588450C416D6F9D4",
  },
  [mainnet.id]: {
    tokenMessenger: "0xBd3fa81B58Ba92a82136038B25aDec7066af3155",
    messageTransmitter: "0x0a992d191DEeC32aFe36203Ad87D7d289a738F81",
  },
} as const;

// CCTP Token Messenger ABI (minimal required functions)
export const TOKEN_MESSENGER_ABI = [
  "function depositForBurn(uint256 amount, uint32 destinationDomain, bytes32 mintRecipient, address burnToken) external returns (uint64)",
  "function replaceDepositForBurn(bytes calldata originalMessage, bytes calldata originalAttestation, bytes32 newDestinationCaller, bytes32 newMintRecipient) external",
] as const;

// CCTP Message Transmitter ABI (minimal required functions)
export const MESSAGE_TRANSMITTER_ABI = [
  "function receiveMessage(bytes calldata message, bytes calldata attestation) external returns (bool)",
  "function replaceMessage(bytes calldata originalMessage, bytes calldata originalAttestation, bytes calldata newMessageBody, bytes32 newDestinationCaller) external",
] as const;

// Domain IDs for CCTP
export const CCTP_DOMAINS = {
  [mainnet.id]: 0, // Ethereum
  [base.id]: 6,    // Base
} as const;

/**
 * Generate CCTP bridge transaction calls to transfer USDC from Base to Ethereum
 * @param amount - Amount of USDC to bridge (in wei, 6 decimals)
 * @param recipient - Ethereum address to receive USDC
 * @param usdcAddress - USDC contract address on source chain
 * @returns Array of transaction calls for CCTP bridge
 */
export function generateCCTPBridgeCalls(
  amount: bigint,
  recipient: Address,
  usdcAddress: Address,
  sourceChainId: number = base.id
): { to: Address; data: `0x${string}` }[] {
  const tokenMessenger = CCTP_CONTRACTS[sourceChainId as keyof typeof CCTP_CONTRACTS]?.tokenMessenger;
  const destinationDomain = sourceChainId === base.id ? CCTP_DOMAINS[mainnet.id] : CCTP_DOMAINS[base.id];
  
  if (!tokenMessenger) {
    throw new Error(`CCTP not supported on chain ${sourceChainId}`);
  }

  // Convert recipient address to bytes32 format required by CCTP
  const mintRecipient = `0x${recipient.slice(2).padStart(64, '0')}` as `0x${string}`;

  return [
    // 1. Approve USDC spending by TokenMessenger
    {
      to: usdcAddress,
      data: encodeFunctionData({
        abi: [
          "function approve(address spender, uint256 amount) external returns (bool)"
        ],
        functionName: "approve",
        args: [tokenMessenger, amount],
      }),
    },
    // 2. Deposit USDC for burn (initiates bridge)
    {
      to: tokenMessenger,
      data: encodeFunctionData({
        abi: TOKEN_MESSENGER_ABI,
        functionName: "depositForBurn",
        args: [amount, destinationDomain, mintRecipient, usdcAddress],
      }),
    },
  ];
}

/**
 * Check if CCTP bridge is required for a strategy
 * @param strategyChainId - Chain ID where strategy is deployed
 * @param userChainId - Chain ID where user currently has funds
 * @returns true if bridge is required
 */
export function isCCTPBridgeRequired(strategyChainId: number, userChainId: number): boolean {
  return strategyChainId !== userChainId && 
         (strategyChainId === mainnet.id || strategyChainId === base.id) &&
         (userChainId === mainnet.id || userChainId === base.id);
}

/**
 * Estimate CCTP bridge time
 * @returns Estimated bridge time in minutes
 */
export function getCCTPBridgeTime(): number {
  return 2; // CCTP typically takes 1-2 minutes
}

/**
 * Get CCTP bridge status/tracking info
 * @param messageHash - Transaction hash from source chain
 * @returns Bridge status information
 */
export async function getCCTPBridgeStatus(messageHash: string) {
  // This would integrate with Circle's CCTP API for tracking
  // For now, return placeholder
  return {
    status: "pending" as "pending" | "completed" | "failed",
    estimatedTime: getCCTPBridgeTime(),
    sourceChain: "Base",
    destinationChain: "Ethereum",
  };
}

/**
 * Enhanced strategy interface that includes CCTP bridge information
 */
export interface BridgeableStrategyInfo {
  strategyId: string;
  chainId: number;
  requiresBridge: boolean;
  bridgeFrom?: number;
  bridgeEstimateTime?: number;
  bridgeType?: "cctp" | "native";
}

/**
 * Get bridge requirements for a strategy
 */
export function getStrategyBridgeInfo(
  strategyChainId: number,
  userChainId: number,
  strategyId: string
): BridgeableStrategyInfo {
  const requiresBridge = isCCTPBridgeRequired(strategyChainId, userChainId);
  
  return {
    strategyId,
    chainId: strategyChainId,
    requiresBridge,
    bridgeFrom: requiresBridge ? userChainId : undefined,
    bridgeEstimateTime: requiresBridge ? getCCTPBridgeTime() : undefined,
    bridgeType: requiresBridge ? "cctp" : undefined,
  };
}
