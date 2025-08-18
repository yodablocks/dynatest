import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mainnet } from 'viem/chains';
import { SmokehouseStrategy } from '@/classes/strategies/steakhouse/smokehouse';
import { USDC } from '@/constants/coins';

// Mock wagmi config
vi.mock('@wagmi/core', () => ({
  readContract: vi.fn(),
}));

vi.mock('@/providers/config', () => ({
  wagmiConfig: {
    chains: [{ id: 1, name: 'mainnet' }],
  },
}));

describe('SmokehouseStrategy', () => {
  let strategy: SmokehouseStrategy;
  const mockUser = '0x1234567890123456789012345678901234567890';
  const mockUSDC = USDC.chains[mainnet.id];
  const mockAmount = BigInt('1000000000'); // 1000 USDC (6 decimals)

  beforeEach(() => {
    strategy = new SmokehouseStrategy(mainnet.id);
    vi.clearAllMocks();
  });

  it('should create strategy with correct parameters', () => {
    expect(strategy.chainId).toBe(mainnet.id);
    expect(strategy.protocol.name).toBe('Smokehouse');
    expect(strategy.name).toBe('SmokehouseStrategy');
  });

  it('should generate correct invest calls', async () => {
    const calls = await strategy.investCalls(mockAmount, mockUser, mockUSDC);
    
    expect(calls).toHaveLength(2);
    
    // First call should be approve
    expect(calls[0].to).toBe(mockUSDC);
    expect(calls[0].data).toBeDefined();
    
    // Second call should be deposit
    expect(calls[1].to).toBe('0xBEeFFF209270748ddd194831b3fa287a5386f5bC');
    expect(calls[1].data).toBeDefined();
  });

  it('should throw error when asset is not provided for invest', async () => {
    await expect(
      strategy.investCalls(mockAmount, mockUser)
    ).rejects.toThrow('SmokehouseStrategy: asset parameter is required');
  });

  it('should generate correct redeem calls', async () => {
    const shares = BigInt('1000000000000000000'); // 1 share (18 decimals)
    
    const calls = await strategy.redeemCalls(shares, mockUser);
    
    expect(calls).toHaveLength(1);
    expect(calls[0].to).toBe('0xBEeFFF209270748ddd194831b3fa287a5386f5bC');
    expect(calls[0].data).toBeDefined();
  });

  it('should support mainnet chain', () => {
    expect(strategy.isSupported(mainnet.id)).toBe(true);
    expect(strategy.isSupported(8453)).toBe(false); // Base chain
  });

  it('should calculate profit correctly', async () => {
    const { readContract } = await import('@wagmi/core');
    
    // Mock convertToAssets response
    vi.mocked(readContract).mockResolvedValue(BigInt('1050000000000000000')); // 1.05 USDC per share
    
    const mockPosition = {
      id: '1',
      userId: 'user1',
      strategyId: 'SmokehouseStrategy',
      chainId: mainnet.id,
      entryPrice: 1.0, // 1.0 USDC per share when entered
      amount: BigInt('1000000000'),
      createAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const profit = await strategy.getProfit(mockUser, mockPosition);
    
    // Should be 5% profit ((1.05 - 1.0) / 1.0 * 100)
    expect(profit).toBe(5);
  });

  it('should handle profit calculation errors gracefully', async () => {
    const { readContract } = await import('@wagmi/core');
    
    // Mock readContract to throw error
    vi.mocked(readContract).mockRejectedValue(new Error('Network error'));
    
    const mockPosition = {
      id: '1',
      userId: 'user1',
      strategyId: 'SmokehouseStrategy',
      chainId: mainnet.id,
      entryPrice: 1.0,
      amount: BigInt('1000000000'),
      createAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
      updatedAt: new Date().toISOString(),
    };

    const profit = await strategy.getProfit(mockUser, mockPosition);
    
    // Should return estimated profit based on time (30 days * daily rate)
    const expectedDailyRate = 0.06 / 365; // 6% APY
    const expectedProfit = expectedDailyRate * 30 * 100;
    expect(profit).toBeCloseTo(expectedProfit, 2);
  });

  it('should get current share price', async () => {
    const { readContract } = await import('@wagmi/core');
    
    // Mock convertToAssets response
    vi.mocked(readContract).mockResolvedValue(BigInt('1020000000000000000')); // 1.02 USDC per share
    
    const sharePrice = await strategy.getCurrentSharePrice();
    
    expect(sharePrice).toBe(1.02);
  });

  it('should handle share price errors gracefully', async () => {
    const { readContract } = await import('@wagmi/core');
    
    // Mock readContract to throw error
    vi.mocked(readContract).mockRejectedValue(new Error('Network error'));
    
    const sharePrice = await strategy.getCurrentSharePrice();
    
    // Should return default share price
    expect(sharePrice).toBe(1.0);
  });
});
