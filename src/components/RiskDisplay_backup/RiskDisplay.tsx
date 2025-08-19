import React, { useState } from 'react';
import type { RiskLevel } from '@/types';
import type { RiskAssessment } from '@/services/riskCalculationService';

interface RiskDisplayProps {
  riskLevel: RiskLevel;
  assessment?: RiskAssessment | null;
  showDetails?: boolean;
  className?: string;
}

const RISK_COLORS = {
  low: {
    bg: 'bg-green-100 dark:bg-green-900/20',
    text: 'text-green-800 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800',
    indicator: 'bg-green-500'
  },
  medium: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/20',
    text: 'text-yellow-800 dark:text-yellow-400',
    border: 'border-yellow-200 dark:border-yellow-800',
    indicator: 'bg-yellow-500'
  },
  high: {
    bg: 'bg-red-100 dark:bg-red-900/20',
    text: 'text-red-800 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800',
    indicator: 'bg-red-500'
  }
};

const RISK_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High'
};

export function RiskDisplay({ riskLevel, assessment, showDetails = false, className = '' }: RiskDisplayProps) {
  const [showReasoningModal, setShowReasoningModal] = useState(false);
  const colors = RISK_COLORS[riskLevel];
  const isCalculated = assessment?.source === 'calculated';

  return (
    <div className={`inline-flex items-center ${className}`}>
      {/* Risk Badge */}
      <div className={`
        inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border
        ${colors.bg} ${colors.text} ${colors.border}
      `}>
        <div className={`w-2 h-2 rounded-full mr-2 ${colors.indicator}`} />
        {RISK_LABELS[riskLevel]}
        
        {/* Calculated indicator */}
        {isCalculated && (
          <span className="ml-1 text-xs opacity-75" title="Dynamically calculated">
            📊
          </span>
        )}
        
        {/* Confidence indicator */}
        {assessment?.confidence && (
          <span 
            className="ml-1 text-xs opacity-75 cursor-help" 
            title={`Confidence: ${assessment.confidence}`}
          >
            {assessment.confidence === 'high' ? '●●●' : 
             assessment.confidence === 'medium' ? '●●○' : '●○○'}
          </span>
        )}
      </div>

      {/* Details button */}
      {showDetails && assessment && (
        <button
          onClick={() => setShowReasoningModal(true)}
          className="ml-2 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          title="View risk assessment details"
        >
          ℹ️
        </button>
      )}

      {/* Risk Assessment Modal */}
      {showReasoningModal && assessment && (
        <RiskAssessmentModal
          assessment={assessment}
          onClose={() => setShowReasoningModal(false)}
        />
      )}
    </div>
  );
}

interface RiskAssessmentModalProps {
  assessment: RiskAssessment;
  onClose: () => void;
}

function RiskAssessmentModal({ assessment, onClose }: RiskAssessmentModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Risk Assessment Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Overall Score */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Overall Risk Score
            </span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    assessment.score <= 0.33 ? 'bg-green-500' :
                    assessment.score <= 0.66 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(assessment.score * 100, 100)}%` }}
                />
              </div>
              <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                {(assessment.score * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Risk Factors Breakdown */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Risk Factors
            </h4>
            <div className="space-y-2">
              {Object.entries(assessment.factors).map(([factor, score]) => (
                <div key={factor} className="flex items-center justify-between">
                  <span className="text-sm capitalize text-gray-600 dark:text-gray-400">
                    {factor} Risk
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${
                          score <= 0.33 ? 'bg-green-500' :
                          score <= 0.66 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(score * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-gray-500 dark:text-gray-500 w-8">
                      {(score * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reasoning */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Assessment Reasoning
            </h4>
            <div className="space-y-2">
              {assessment.reasoning.map((reason, index) => (
                <div 
                  key={index}
                  className="text-sm text-gray-600 dark:text-gray-400 pl-4 border-l-2 border-gray-200 dark:border-gray-700"
                >
                  {reason}
                </div>
              ))}
            </div>
          </div>

          {/* Confidence & Source */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-500">
                Confidence: <span className="font-medium capitalize">{assessment.confidence}</span>
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-500">
                Source: <span className="font-medium capitalize">{assessment.source}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-b-lg">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Risk assessment based on Exponential DeFi methodology and academic research. 
            This is for informational purposes only and should not be considered financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}

export { RiskAssessmentModal };
