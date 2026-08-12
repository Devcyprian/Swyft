# Swap Integration Guide

How to execute token swaps on the Swyft concentrated liquidity DEX.

## Overview

Swaps on Swyft route through one or more pools to find the best price. The router automatically selects the optimal path and fee tier for your input/output pair.

## Basic Swap

```typescript
import { SwyftClient } from "@swyft/sdk";

const client = new SwyftClient({ network: "testnet" });

// Swap exact input amount
const result = await client.swapExactInput({
  tokenIn: "XLM",
  tokenOut: "USDC",
  amountIn: 100_0000000n,   // 100 XLM
  slippageTolerance: 50,    // 0.5% max slippage
  recipient: myAddress,
  deadline: Math.floor(Date.now() / 1000) + 300,
});

console.log("USDC received:", result.amountOut);
console.log("Price impact:", result.priceImpact, "%");
```

## Swap with Exact Output

```typescript
// Receive exactly 50 USDC, spend as little XLM as possible
const result = await client.swapExactOutput({
  tokenIn: "XLM",
  tokenOut: "USDC",
  amountOut: 50_0000000n,
  slippageTolerance: 50,
  recipient: myAddress,
  deadline: Math.floor(Date.now() / 1000) + 300,
});

console.log("XLM spent:", result.amountIn);
```

## Simulating a Swap (Quote)

Always simulate before submitting to show the user an accurate quote:

```typescript
const quote = await client.quoteSwap({
  tokenIn: "XLM",
  tokenOut: "USDC",
  amountIn: 100_0000000n,
});

console.log("Expected out:", quote.amountOut);
console.log("Price impact:", quote.priceImpact, "%");
console.log("Route:", quote.route);
```

## Slippage and Deadlines

- **Slippage tolerance** — the maximum price movement you accept. Values above 1% risk sandwich attacks on mainnet; keep it 0.1%–0.5% for stable pairs.
- **Deadline** — Unix timestamp after which the transaction reverts. Always set a deadline (5 minutes is standard) to avoid stale transactions executing at an unfavourable price.

## Multi-hop Routing

The router automatically splits through intermediate pools when no direct pool exists:

```
AQUA → XLM → USDC   (2-hop)
```

You do not need to specify the route manually — the SDK finds the best path.

## Error Codes

| Code | Meaning |
|------|---------|
| `SlippageExceeded` | Price moved beyond your tolerance |
| `DeadlineExpired` | Transaction submitted after deadline |
| `InsufficientLiquidity` | Pool does not have enough depth for your size |
| `InvalidPool` | Token pair has no pool at this fee tier |
