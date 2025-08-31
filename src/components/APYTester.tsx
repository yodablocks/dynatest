'use client';

import { useState } from 'react';
import { useStrategyLiveData, getCacheStatus, clearCache, formatAPY, formatTVL } from '@/services/strategyDataService';

const TEST_STRATEGIES = [
  'SmokehouseStrategy',  // Should work with Morpho API
  'Re7Strategy',         // Should work with Morpho API
  'MevCapitalStrategy',  // Should work with Morpho API
  'MorphoSupply',        // Will use fallback (Base chain)
  'AaveV3Supply',        // Will use fallback (Expand API disabled)
  'FluidSupply'          // Will use fallback (no API)
];

function StrategyTestCard({ strategyId }: { strategyId: string }) {
  const { data: liveData, loading } = useStrategyLiveData(strategyId);

  return (
    <div className="border rounded-lg p-4 mb-3">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{strategyId}</h3>
        <div className="flex items-center gap-2">
          {loading && <span className="text-blue-500 text-sm">Loading...</span>}
          {liveData && (
            <span className={`px-2 py-1 rounded text-xs ${
              liveData.source === 'morpho' ? 'bg-green-100 text-green-800' :
              liveData.source === 'expand' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {liveData.source}
            </span>
          )}
        </div>
      </div>
      
      {liveData && (
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-gray-500">APY</div>
            <div className="font-medium">{formatAPY(liveData.apy)}</div>
          </div>
          <div>
            <div className="text-gray-500">TVL</div>
            <div className="font-medium">{formatTVL(liveData.tvl)}</div>
          </div>
          <div>
            <div className="text-gray-500">Daily</div>
            <div className="font-medium">{liveData.dailyRate.toFixed(4)}%</div>
          </div>
        </div>
      )}

      {liveData?.error && (
        <div className="text-red-600 text-xs mt-2 p-2 bg-red-50 rounded">
          Error: {liveData.error}
        </div>
      )}
    </div>
  );
}

export function APYTester() {
  const [cacheStatus, setCacheStatus] = useState<any[]>([]);
  const [showCache, setShowCache] = useState(false);

  const handleClearCache = () => {
    clearCache();
    setCacheStatus(getCacheStatus());
  };

  const handleShowCache = () => {
    setCacheStatus(getCacheStatus());
    setShowCache(!showCache);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">APY Service Tester</h2>
        <div className="flex gap-2">
          <button
            onClick={handleShowCache}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {showCache ? 'Hide' : 'Show'} Cache
          </button>
          <button
            onClick={handleClearCache}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear Cache
          </button>
        </div>
      </div>

      {showCache && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Cache Status</h3>
          {cacheStatus.length === 0 ? (
            <p className="text-gray-500">No cached data</p>
          ) : (
            <div className="space-y-1">
              {cacheStatus.map((status, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{status.strategy}</span>
                  <span className="text-gray-500">
                    {status.cached ? `${Math.round(status.age / 1000)}s ago (${status.source})` : 'Not cached'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Strategy Data Tests</h3>
        <div className="text-sm text-gray-600 mb-4">
          🟢 Morpho strategies should show live data | 🔵 AAVE needs API key | ⚪ Others use fallback
        </div>
        
        {TEST_STRATEGIES.map(strategyId => (
          <StrategyTestCard key={strategyId} strategyId={strategyId} />
        ))}
      </div>

      <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">Next Steps:</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>1. Test Morpho API integration (should work immediately)</li>
          <li>2. Get Expand Network API key for AAVE strategies</li>
          <li>3. Research Base chain lendborrowId for AAVE V3</li>
          <li>4. Add environment variables to .env.local</li>
        </ul>
      </div>
    </div>
  );
}
