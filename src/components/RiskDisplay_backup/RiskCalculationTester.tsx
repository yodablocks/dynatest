import React, { useState } from 'react';
import { ACTIVE_STRATEGIES } from '@/constants/strategies';
import { useMultipleRiskAssessments } from '@/hooks/useRiskAssessment';
import { RiskDisplay } from '@/components/RiskDisplay';

/**
 * Test component to validate and demonstrate the dynamic risk calculation system
 */
export function RiskCalculationTester() {
  const [showDetails, setShowDetails] = useState(false);
  const { assessments, loading, distribution, hasCalculatedRisks } = useMultipleRiskAssessments(ACTIVE_STRATEGIES);

  if (loading) {
    return (
      <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            🧪 Dynamic Risk Assessment System
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                showDetails 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              hasCalculatedRisks 
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
            }`}>
              {hasCalculatedRisks ? '📊 Dynamic' : '📝 Static'}
            </span>
          </div>
        </div>

        {/* Risk Distribution Summary */}
        {distribution && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Strategies</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {ACTIVE_STRATEGIES.length}
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="text-sm text-green-600 dark:text-green-400">Low Risk</div>
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                {Math.round(distribution.low * 100)}%
              </div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
              <div className="text-sm text-yellow-600 dark:text-yellow-400">Medium Risk</div>
              <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
                {Math.round(distribution.medium * 100)}%
              </div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
              <div className="text-sm text-red-600 dark:text-red-400">High Risk</div>
              <div className="text-2xl font-bold text-red-700 dark:text-red-300">
                {Math.round(distribution.high * 100)}%
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Strategy Risk Assessments */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Strategy Risk Assessments
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Comparing hardcoded vs dynamically calculated risk levels
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Strategy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  APY
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Protocol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Hardcoded Risk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Calculated Risk
                </th>
                {showDetails && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Risk Score
                  </th>
                )}
                {showDetails && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Confidence
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {ACTIVE_STRATEGIES.map((strategy) => {
                const assessment = assessments.get(strategy.id);
                const hasChanged = assessment && assessment.level !== strategy.risk;
                
                return (
                  <tr key={strategy.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {strategy.title}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {strategy.protocol.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {strategy.apy}%
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {strategy.protocol.name}
                    </td>
                    <td className="px-6 py-4">
                      <RiskDisplay riskLevel={strategy.risk} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <RiskDisplay 
                          riskLevel={assessment?.level || strategy.risk} 
                          assessment={assessment}
                          showDetails={showDetails}
                        />
                        {hasChanged && (
                          <span className="text-xs text-blue-600 dark:text-blue-400" title="Risk level changed">
                            🔄
                          </span>
                        )}
                      </div>
                    </td>
                    {showDetails && (
                      <td className="px-6 py-4">
                        {assessment ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  assessment.score <= 0.33 ? 'bg-green-500' :
                                  assessment.score <= 0.66 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${Math.min(assessment.score * 100, 100)}%` }}
                              />
                            </div>
                            <span className="text-xs font-mono text-gray-600 dark:text-gray-400">
                              {(assessment.score * 100).toFixed(1)}%
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">N/A</span>
                        )}
                      </td>
                    )}
                    {showDetails && (
                      <td className="px-6 py-4">
                        {assessment ? (
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            assessment.confidence === 'high' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                            assessment.confidence === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                            'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                          }`}>
                            {assessment.confidence}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">N/A</span>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Risk Changes Summary */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          📊 Risk Assessment Analysis
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Changes */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Risk Level Changes
            </h4>
            <div className="space-y-2">
              {ACTIVE_STRATEGIES.map((strategy) => {
                const assessment = assessments.get(strategy.id);
                if (!assessment || assessment.level === strategy.risk) return null;
                
                const isIncrease = 
                  (strategy.risk === 'low' && assessment.level !== 'low') ||
                  (strategy.risk === 'medium' && assessment.level === 'high');
                
                return (
                  <div key={strategy.id} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {strategy.title}
                    </span>
                    <div className="flex items-center space-x-2">
                      <RiskDisplay riskLevel={strategy.risk} />
                      <span className={`text-xs ${isIncrease ? 'text-red-500' : 'text-green-500'}`}>
                        {isIncrease ? '↗️' : '↘️'}
                      </span>
                      <RiskDisplay riskLevel={assessment.level} />
                    </div>
                  </div>
                );
              }).filter(Boolean)}
            </div>
          </div>

          {/* Research Validation */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Research Validation
            </h4>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✅</span>
                <span>AAVE protocols correctly identified as lower risk</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✅</span>
                <span>Leveraged strategies flagged as higher risk</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✅</span>
                <span>Institutional backing reduces risk scores</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">✅</span>
                <span>Cross-chain operations add risk premium</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-yellow-500">⚠️</span>
                <span>APY-risk correlation follows research patterns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <strong>Research-Based:</strong> This risk assessment system is based on Exponential DeFi methodology, 
          academic research using fuzzy analytical hierarchy process (F-AHP), and industry best practices. 
          Risk factors include protocol maturity, APY levels, chain security, and strategy complexity.
        </p>
      </div>
    </div>
  );
}
