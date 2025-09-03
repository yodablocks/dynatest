"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useAccountProviderContext } from "@/contexts/AccountContext";
import { authDebugUtils } from "@/utils/authDebug";
import { useState } from "react";

/**
 * Development-only component for debugging authentication issues
 * Only shows in development mode and when there are issues
 */
export default function AuthDebugPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, authenticated } = usePrivy();
  const { embeddedWallet, isDeployed, kernelAccountClient } = useAccountProviderContext();

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  // Determine if we should show the debug panel
  const hasIssues = authenticated && (!embeddedWallet || !kernelAccountClient);
  
  return (
    <div className="fixed bottom-4 left-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className={`px-3 py-2 rounded-lg text-xs font-medium shadow-lg transition-colors ${
            hasIssues 
              ? 'bg-red-100 text-red-700 border border-red-200 hover:bg-red-200' 
              : 'bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200'
          }`}
        >
          {hasIssues ? '⚠️ Auth Issues' : '🔧 Auth Debug'}
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl border p-4 min-w-[300px] max-w-[400px]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-sm text-gray-900">Auth Debug Panel</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 text-lg"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-3 gap-2">
              <div className="text-gray-600">Authenticated:</div>
              <div className={authenticated ? 'text-green-600' : 'text-red-600'}>
                {authenticated ? '✓' : '✗'}
              </div>
              <div></div>
              
              <div className="text-gray-600">User:</div>
              <div className={user ? 'text-green-600' : 'text-red-600'}>
                {user ? '✓' : '✗'}
              </div>
              <div className="text-gray-500">{user?.email?.address || user?.id?.slice(0, 8) + '...'}</div>
              
              <div className="text-gray-600">Wallet:</div>
              <div className={embeddedWallet ? 'text-green-600' : 'text-red-600'}>
                {embeddedWallet ? '✓' : '✗'}
              </div>
              <div className="text-gray-500">{embeddedWallet?.address?.slice(0, 6) + '...'}</div>
              
              <div className="text-gray-600">Deployed:</div>
              <div className={isDeployed ? 'text-green-600' : 'text-yellow-600'}>
                {isDeployed ? '✓' : '⏳'}
              </div>
              <div></div>
              
              <div className="text-gray-600">Kernel Client:</div>
              <div className={kernelAccountClient ? 'text-green-600' : 'text-red-600'}>
                {kernelAccountClient ? '✓' : '✗'}
              </div>
              <div></div>
            </div>
            
            {hasIssues && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <div className="text-yellow-800 font-medium text-xs mb-2">
                  ⚠️ Authentication Issues Detected
                </div>
                <div className="text-yellow-700 text-xs">
                  {!embeddedWallet && "• Embedded wallet not created\n"}
                  {!kernelAccountClient && "• Kernel client creation failed\n"}
                </div>
              </div>
            )}
            
            <div className="mt-4 space-y-2">
              <button
                onClick={() => {
                  authDebugUtils.runDiagnostics();
                  console.log('📊 Check console for detailed diagnostics');
                }}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs py-2 px-3 rounded transition-colors"
              >
                Run Diagnostics
              </button>
              
              {hasIssues && (
                <button
                  onClick={() => {
                    if (confirm('This will clear all authentication data and reload the page. Continue?')) {
                      authDebugUtils.clearAuthCache();
                      setTimeout(() => window.location.reload(), 1000);
                    }
                  }}
                  className="w-full bg-red-500 hover:bg-red-600 text-white text-xs py-2 px-3 rounded transition-colors"
                >
                  Clear Cache & Reload
                </button>
              )}
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="text-gray-500 text-xs">
                💡 Check browser console for detailed logs
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}