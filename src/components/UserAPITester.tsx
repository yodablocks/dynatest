import { useState } from 'react';

interface TestResult {
  endpoint: string;
  status: number;
  success: boolean;
  data?: any;
  error?: string;
}

export default function UserAPITester() {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const runTests = async () => {
    setIsLoading(true);
    setTestResults([]);
    const results: TestResult[] = [];

    // Test 1: Create a test user
    const testUser = {
      privy_id: 'test_' + Date.now(),
      address: '0x' + Math.random().toString(16).substring(2, 42).padStart(40, '0'),
      login_type: 'google',
      login_id: 'test@example.com',
      total_value: 0
    };

    try {
      const createResponse = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testUser)
      });

      results.push({
        endpoint: 'POST /api/user',
        status: createResponse.status,
        success: createResponse.ok,
        data: await createResponse.json()
      });
    } catch (error) {
      results.push({
        endpoint: 'POST /api/user',
        status: 0,
        success: false,
        error: (error as Error).message
      });
    }

    // Test 2: Get the created user
    try {
      const getResponse = await fetch(`/api/user/${testUser.address}`);
      results.push({
        endpoint: `GET /api/user/${testUser.address}`,
        status: getResponse.status,
        success: getResponse.ok,
        data: await getResponse.json()
      });
    } catch (error) {
      results.push({
        endpoint: `GET /api/user/${testUser.address}`,
        status: 0,
        success: false,
        error: (error as Error).message
      });
    }

    // Test 3: Update user total value
    try {
      const updateResponse = await fetch(`/api/users/update_total/${testUser.address}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ total_value: 1000 })
      });

      results.push({
        endpoint: `PATCH /api/users/update_total/${testUser.address}`,
        status: updateResponse.status,
        success: updateResponse.ok,
        data: await updateResponse.json()
      });
    } catch (error) {
      results.push({
        endpoint: `PATCH /api/users/update_total/${testUser.address}`,
        status: 0,
        success: false,
        error: (error as Error).message
      });
    }

    // Test 4: Get all users
    try {
      const getAllResponse = await fetch('/api/user');
      results.push({
        endpoint: 'GET /api/user',
        status: getAllResponse.status,
        success: getAllResponse.ok,
        data: await getAllResponse.json()
      });
    } catch (error) {
      results.push({
        endpoint: 'GET /api/user',
        status: 0,
        success: false,
        error: (error as Error).message
      });
    }

    setTestResults(results);
    setIsLoading(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">User API Tester</h2>
      
      <button
        onClick={runTests}
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? 'Running Tests...' : 'Run API Tests'}
      </button>

      {testResults.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Test Results:</h3>
          <div className="space-y-3">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-3 border rounded ${
                  result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm">{result.endpoint}</span>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {result.status === 0 ? 'ERROR' : result.status}
                  </span>
                </div>
                {result.error && (
                  <div className="text-red-600 text-sm mb-2">
                    Error: {result.error}
                  </div>
                )}
                {result.data && (
                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
