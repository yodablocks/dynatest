import { createConfig } from "@privy-io/wagmi";
import { celo, flowMainnet, base, bsc, arbitrum, polygon, mainnet } from "viem/chains";
import { defineChain } from "viem";

// Define HyperEVM chain
export const hyperEvm = defineChain({
  id: 998,
  name: 'Hyperliquid EVM Testnet',
  nativeCurrency: { name: 'HYPE', symbol: 'HYPE', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.hyperliquid-testnet.xyz/evm'],
    },
  },
  blockExplorers: {
    default: {
      name: 'HyperEVM Explorer',
      url: 'https://explorer.hyperliquid-testnet.xyz',
    },
  },
  testnet: true,
});
import { http } from "wagmi";

export const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

// Check if Alchemy API key is available
const hasAlchemyKey = !!ALCHEMY_API_KEY;

// Enhanced HTTP transport with rate limiting and retry logic
const createRobustHttpTransport = (urls: string | string[], chainId: number) => {
  const urlArray = Array.isArray(urls) ? urls : [urls];
  
  return http(urlArray[0], {
    batch: {
      multicall: {
        batchSize: 1024,
        wait: 32, // Wait 32ms to batch calls together
      },
    },
    fallbackUrls: urlArray.slice(1),
    retryCount: 3,
    retryDelay: (attempt) => {
      // Exponential backoff with jitter for rate limits
      const baseDelay = Math.min(1000 * Math.pow(2, attempt), 10000);
      const jitter = Math.random() * 1000; // Add randomness to prevent thundering herd
      return baseDelay + jitter;
    },
    timeout: 30000, // 30 second timeout
    onError: (error) => {
      if (error.message?.includes('429') || error.message?.includes('rate limit')) {
        console.warn(`🚫 Rate limit hit on chain ${chainId}, switching to fallback...`);
      }
    },
  });
};

// Fallback to public RPC endpoints if Alchemy key is missing
const getHttpTransport = (chainId: number, alchemyUrl?: string) => {
  const fallbackUrls: string[] = [];
  
  // Add Alchemy URL if available
  if (hasAlchemyKey && alchemyUrl) {
    fallbackUrls.push(`${alchemyUrl}/${ALCHEMY_API_KEY}`);
  }
  
  // Add multiple public RPC endpoints as fallbacks
  switch (chainId) {
    case mainnet.id:
      fallbackUrls.push(
        "https://eth-mainnet.public.blastapi.io",
        "https://ethereum.publicnode.com",
        "https://1rpc.io/eth"
      );
      break;
    case base.id:
      fallbackUrls.push(
        "https://mainnet.base.org",
        "https://base-mainnet.public.blastapi.io", 
        "https://base.gateway.fm",
        "https://1rpc.io/base"
      );
      break;
    case arbitrum.id:
      fallbackUrls.push(
        "https://arb1.arbitrum.io/rpc",
        "https://arbitrum-mainnet.public.blastapi.io",
        "https://1rpc.io/arb"
      );
      break;
    case polygon.id:
      fallbackUrls.push(
        "https://polygon-rpc.com",
        "https://polygon-mainnet.public.blastapi.io",
        "https://1rpc.io/matic"
      );
      break;
    case bsc.id:
      fallbackUrls.push(
        "https://bsc-dataseed1.binance.org",
        "https://bsc-dataseed2.binance.org",
        "https://bsc-mainnet.public.blastapi.io"
      );
      break;
    case celo.id:
      fallbackUrls.push("https://forno.celo.org");
      break;
    case flowMainnet.id:
      fallbackUrls.push("https://access-mainnet-beta.onflow.org");
      break;
    case hyperEvm.id:
      fallbackUrls.push("https://rpc.hyperliquid-testnet.xyz/evm");
      break;
    default:
      fallbackUrls.push("https://cloudflare-eth.com"); // Generic fallback
  }
  
  return createRobustHttpTransport(fallbackUrls, chainId);
};

export const wagmiConfig = createConfig({
  chains: [mainnet, base, arbitrum, celo, flowMainnet, bsc, polygon, hyperEvm],
  transports: {
    [mainnet.id]: getHttpTransport(mainnet.id, "https://eth-mainnet.g.alchemy.com/v2"),
    [celo.id]: getHttpTransport(celo.id, "https://celo-mainnet.g.alchemy.com/v2"),
    [flowMainnet.id]: getHttpTransport(flowMainnet.id, "https://flow-mainnet.g.alchemy.com/v2"),
    [base.id]: getHttpTransport(base.id, "https://base-mainnet.g.alchemy.com/v2"),
    [bsc.id]: getHttpTransport(bsc.id, "https://bnb-mainnet.g.alchemy.com/v2"),
    [arbitrum.id]: getHttpTransport(arbitrum.id, "https://arb-mainnet.g.alchemy.com/v2"),
    [polygon.id]: getHttpTransport(polygon.id, "https://polygon-mainnet.g.alchemy.com/v2"),
    [hyperEvm.id]: getHttpTransport(hyperEvm.id),
  },
});

// Create a mapped type for chain IDs from wagmiConfig.chains
export type SupportedChainIds = (typeof wagmiConfig.chains)[number]["id"];

// Log configuration status with more details
if (typeof window !== 'undefined') {
  console.log(`🔗 Enhanced blockchain config: ${hasAlchemyKey ? 'Alchemy API + Fallbacks' : 'Public RPC fallbacks'} with rate limiting`);
}
