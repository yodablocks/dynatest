import { useState, useEffect } from 'react';

export interface BridgeStatus {
  isOperational: boolean;
  lastChecked: Date;
  estimatedDowntime?: number; // minutes
  errorMessage?: string;
  maintenanceMode?: boolean;
  source: 'circle' | 'manual' | 'cached';
}

interface BridgeStatusCache {
  status: BridgeStatus;
  timestamp: number;
}

// Cache for 2 minutes to avoid excessive checks
const CACHE_DURATION = 2 * 60 * 1000;
let bridgeStatusCache: BridgeStatusCache | null = null;

/**
 * Check CCTP bridge operational status
 * This is a simplified check - in production you'd integrate with Circle's status API
 */
async function checkCCTPBridgeStatus(): Promise<BridgeStatus> {
  try {
    // For now, we'll implement a manual override system
    // In production, this would call Circle's API or check recent bridge transactions
    
    // Check if there's a manual bridge disable flag
    const manualDisable = localStorage.getItem('dynavest-bridge-disabled');
    if (manualDisable === 'true') {
      return {
        isOperational: false,
        lastChecked: new Date(),
        errorMessage: 'Bridge temporarily disabled by administrators',
        maintenanceMode: true,
        source: 'manual'
      };
    }

    // Simple heuristic: try to fetch Circle's CCTP API or check recent bridge activity
    const response = await fetch('https://bridge.circle.com/api/status', {
      method: 'GET',
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });

    if (response.ok) {
      return {
        isOperational: true,
        lastChecked: new Date(),
        source: 'circle'
      };
    } else {
      throw new Error(`Circle API returned ${response.status}`);
    }

  } catch (error) {
    console.warn('Bridge status check failed:', error);
    
    // Fallback: assume operational but with warning
    return {
      isOperational: false,
      lastChecked: new Date(),
      errorMessage: 'Unable to verify bridge status - proceed with caution',
      source: 'cached'
    };
  }
}

/**
 * Get bridge status with caching
 */
export async function getBridgeStatus(): Promise<BridgeStatus> {
  // Check cache first
  if (bridgeStatusCache && Date.now() - bridgeStatusCache.timestamp < CACHE_DURATION) {
    return bridgeStatusCache.status;
  }

  // Fetch fresh status
  const status = await checkCCTPBridgeStatus();
  
  // Update cache
  bridgeStatusCache = {
    status,
    timestamp: Date.now()
  };

  return status;
}

/**
 * React hook to monitor bridge status
 */
export function useBridgeStatus() {
  const [status, setStatus] = useState<BridgeStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchStatus = async () => {
      try {
        setLoading(true);
        const bridgeStatus = await getBridgeStatus();
        
        if (mounted) {
          setStatus(bridgeStatus);
        }
      } catch (error) {
        console.error('Error fetching bridge status:', error);
        
        if (mounted) {
          setStatus({
            isOperational: false,
            lastChecked: new Date(),
            errorMessage: 'Bridge status check failed',
            source: 'cached'
          });
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchStatus();

    // Refresh every 2 minutes
    const interval = setInterval(fetchStatus, 2 * 60 * 1000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return { status, loading };
}

/**
 * Manual bridge control functions for admin use
 */
export const bridgeControl = {
  disable: (reason?: string) => {
    localStorage.setItem('dynavest-bridge-disabled', 'true');
    if (reason) {
      localStorage.setItem('dynavest-bridge-disable-reason', reason);
    }
    // Clear cache to force refresh
    bridgeStatusCache = null;
  },
  
  enable: () => {
    localStorage.removeItem('dynavest-bridge-disabled');
    localStorage.removeItem('dynavest-bridge-disable-reason');
    // Clear cache to force refresh
    bridgeStatusCache = null;
  },
  
  getDisableReason: (): string | null => {
    return localStorage.getItem('dynavest-bridge-disable-reason');
  }
};

/**
 * Check if a strategy requires bridging and if bridge is operational
 */
export async function validateStrategyBridge(strategyId: string, chainId: number): Promise<{
  requiresBridge: boolean;
  bridgeOperational: boolean;
  canProceed: boolean;
  warning?: string;
}> {
  const ethereumStrategies = ['SmokehouseStrategy', 'MevCapitalStrategy'];
  const requiresBridge = ethereumStrategies.includes(strategyId) && chainId !== 1; // Not on Ethereum mainnet
  
  if (!requiresBridge) {
    return {
      requiresBridge: false,
      bridgeOperational: true,
      canProceed: true
    };
  }

  const bridgeStatus = await getBridgeStatus();
  
  return {
    requiresBridge: true,
    bridgeOperational: bridgeStatus.isOperational,
    canProceed: bridgeStatus.isOperational,
    warning: bridgeStatus.isOperational 
      ? undefined 
      : bridgeStatus.errorMessage || 'Bridge is currently unavailable'
  };
}
