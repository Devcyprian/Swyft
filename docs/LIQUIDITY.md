# Providing Liquidity on Stellar CLMM DEX

This guide explains how concentrated liquidity works on the Swyft DEX and how to provide liquidity efficiently.

## What is Concentrated Liquidity?

Unlike traditional AMMs that spread liquidity uniformly across all price ranges, concentrated liquidity lets you allocate capital within a specific price range. This means:

- **Higher capital efficiency** — your funds do more work within your chosen range
- **Greater fee earnings** — fees are earned only when the price is within your range
- **More control** — you decide where to concentrate based on your market view

## Key Concepts

### Price Ranges (Ticks)

Prices are discretised into **ticks**. When you open a position you specify:

- `tick_lower` — the lower bound of your range
- `tick_upper` — the upper bound of your range

The narrower the range, the higher your fee share when price is in-range — but you risk going out-of-range more often.

### Fee Tiers

Swyft pools are created with fixed fee tiers:

| Fee Tier | Basis Points | Best For |
|----------|-------------|----------|
| 0.05%    | 5 bps       | Stable pairs (USDC/USDT) |
| 0.30%    | 30 bps      | Standard pairs (XLM/USDC) |
| 1.00%    | 100 bps     | Exotic/volatile pairs |

### Liquidity Units

Liquidity `L` represents the geometric mean of your token reserves within the range. It is not the same as your token amounts — the actual amounts depend on the current price relative to your range.

## Opening a Position

```typescript
import { SwyftClient } from "@swyft/sdk";

const client = new SwyftClient({ network: "testnet" });

const position = await client.addLiquidity({
  pool: "XLM/USDC-30",
  tickLower: -500,
  tickUpper: 500,
  amount0Desired: 1000_0000000n, // 1000 XLM
  amount1Desired: 120_0000000n,  // 120 USDC
  slippageTolerance: 50,         // 0.5%
  deadline: Math.floor(Date.now() / 1000) + 300,
});

console.log("Position ID:", position.tokenId);
console.log("Liquidity added:", position.liquidity);
```

## Collecting Fees

Fees accumulate in your position and must be explicitly collected:

```typescript
const fees = await client.collectFees({
  positionId: position.tokenId,
  recipient: myAddress,
});

console.log("XLM fees collected:", fees.amount0);
console.log("USDC fees collected:", fees.amount1);
```

## Removing Liquidity

```typescript
await client.removeLiquidity({
  positionId: position.tokenId,
  liquidityPercent: 100, // remove 100%
  slippageTolerance: 50,
  deadline: Math.floor(Date.now() / 1000) + 300,
});
```

## Risk Considerations

- **Impermanent loss** is amplified in concentrated positions — a large price move outside your range leaves you holding 100% of the underperforming asset
- **Out-of-range positions** earn zero fees until price returns to your range
- **Range selection** is a trade-off: narrow = more fees in-range, more risk of going out-of-range

## Further Reading

- [Architecture Overview](../README.md)
- [Pool Creation](POOLS.md)
- [Swap Integration](SWAP.md)
