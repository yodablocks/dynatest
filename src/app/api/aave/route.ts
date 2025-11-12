import { NextRequest, NextResponse } from 'next/server';

// Aave pool configurations
const AAVE_POOLS = {
  base: {
    subgraph: 'https://api.goldsky.com/api/public/project_clz3f7ehudnf001x9ainf64b0f/subgraphs/aave-v3-base/1.0.0/gn',
    pool: '0xA238Dd80C259a72e81d7e4664a9801593F98d1c5',
  },
  celo: {
    subgraph: 'https://api.goldsky.com/api/public/project_clz3f7ehudnf001x9ainf64b0f/subgraphs/aave-v3-celo/1.0.0/gn',
    pool: '0x3E59A31363E2ad014dcbc521c4a0d5757d9f3402',
  }
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const strategyId = searchParams.get('strategyId');
    const asset = searchParams.get('asset');

    if (!strategyId || !asset) {
      return NextResponse.json({
        success: false,
        error: 'Missing strategyId or asset parameter'
      }, { status: 400 });
    }

    // Determine which pool to query
    const network = strategyId.includes('Celo') ? 'celo' : 'base';
    const config = AAVE_POOLS[network];

    const query = `
      query GetReserveData($asset: String!) {
        reserve(id: $asset) {
          id
          symbol
          name
          liquidityRate
          totalLiquidity
          availableLiquidity
          utilizationRate
        }
      }
    `;

    const response = await fetch(config.subgraph, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'DynaVest/1.0',
      },
      body: JSON.stringify({
        query,
        variables: { asset: asset.toLowerCase() }
      })
    });

    if (!response.ok) {
      throw new Error(`Subgraph error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }

    const reserve = data.data?.reserve;
    if (!reserve) {
      throw new Error(`No reserve data found for asset: ${asset}`);
    }

    // Transform the data
    const liquidityRateRaw = reserve.liquidityRate || '0';
    const apy = (parseFloat(liquidityRateRaw) / 1e27) * 100;

    // Apply leverage multiplier if needed
    const multiplier = strategyId === 'AaveV3SupplyLeveraged' ? 1.65 : 1.0;
    const finalAPY = apy * multiplier;

    // Convert totalLiquidity from wei to millions
    const tvl = parseFloat(reserve.totalLiquidity || '0') / 1e6 / 1e6;

    return NextResponse.json({
      success: true,
      data: {
        apy: Math.round(finalAPY * 100) / 100,
        tvl: Math.round(tvl * 100) / 100,
        dailyRate: Math.round((finalAPY / 365) * 10000) / 10000,
        utilizationRate: parseFloat(reserve.utilizationRate || '0'),
        lastUpdated: new Date().toISOString(),
        source: 'aave'
      }
    });

  } catch (error) {
    console.error('Aave API route error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
