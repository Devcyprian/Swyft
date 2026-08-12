# Pool Management

Swyft uses concentrated liquidity pools (CLMMs) built on Stellar smart contracts. This guide covers how pools are created, managed, and queried.

## Pool Architecture

Each pool represents a pair of Stellar assets with a specific fee tier. The pool contract tracks:

- **Tick array**: Divides the price range into discrete ticks
- **Liquidity**: Total active liquidity at the current price
- **sqrt_price**: Current square root price (Q64.64 fixed point)
- **fee_growth_global**: Accumulated fees per unit of liquidity

## Fee Tiers

| Tier | Fee (bps) | Tick Spacing | Best For |
|------|-----------|--------------|---------|
| 0.01% | 1 | 1 | Stable pairs |
| 0.05% | 5 | 10 | Correlated assets |
| 0.30% | 30 | 60 | Standard pairs |
| 1.00% | 100 | 200 | Exotic / volatile |

## Creating a Pool

```typescript
import { PoolFactory } from "@swyft/sdk";

const factory = new PoolFactory({ network: "mainnet" });

const pool = await factory.createPool({
  tokenA: "USDC:GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN",
  tokenB: "XLM:native",
  feeTier: 30, // 0.30%
  initialSqrtPrice: encodeSqrtPrice(1, 1),
});

console.log("Pool address:", pool.address);
```

## Querying Pool State

```typescript
import { Pool } from "@swyft/sdk";

const pool = await Pool.load("POOL_CONTRACT_ADDRESS");

const state = await pool.getState();
console.log("Current tick:", state.currentTick);
console.log("Liquidity:", state.liquidity.toString());
console.log("Fee growth global 0:", state.feeGrowthGlobal0.toString());
```

## Pool Observation (TWAP)

Pools maintain a circular buffer of price observations used to compute time-weighted average prices (TWAP):

```typescript
const twap = await pool.getTWAP({ secondsAgo: 3600 }); // 1-hour TWAP
console.log("TWAP:", twap.toString());
```

## Pool Events

| Event | Description |
|-------|-------------|
| `Swap` | Token swap executed |
| `Mint` | Liquidity added |
| `Burn` | Liquidity removed |
| `Collect` | Fees collected |
| `Initialize` | Pool initialized with starting price |

## Related

- [Liquidity Guide](./LIQUIDITY.md)
- [Swap Guide](./SWAP.md)
