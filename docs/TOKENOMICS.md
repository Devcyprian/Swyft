# Tokenomics

This document describes the fee structure and value capture mechanisms within the Swyft protocol.

## Protocol Fees

Swyft does not have a native governance token. Instead, value accrues directly to liquidity providers through swap fees.

### Fee Distribution

For every swap:

- **100% of fees** go to liquidity providers in the active tick range
- **0%** protocol treasury fee (configurable via governance in future versions)

### Fee Calculation Example

Given a 0.30% fee tier pool with 1,000 XLM of liquidity in range:

```
Swap input: 100 XLM
Fee: 100 × 0.003 = 0.3 XLM
Net to pool: 99.7 XLM
Fee split: proportional to each LP's share of in-range liquidity
```

## LP Economics

Liquidity providers earn fees only while the price is within their chosen tick range. Concentrated positions earn higher fee APR but face more frequent rebalancing.

### Example APR Comparison

| Strategy | Range Width | Est. Fee APR* |
|----------|-------------|---------------|
| Full range | ±∞ | 5–15% |
| Narrow (±5%) | ±5% | 40–120% |
| Single tick | ±0.01% | Very high / zero |

*Estimates only. Actual APR depends on volume and price movement.*

## Impermanent Loss

Concentrated liquidity amplifies both fee earnings and impermanent loss. LPs should model IL against expected fee income before providing liquidity.

A simple IL estimate for a price change from P₀ to P₁:

```
IL = 2 × sqrt(P₁/P₀) / (1 + P₁/P₀) - 1
```

## Future Governance

A governance token may be introduced to vote on:
- Protocol fee switch (0–10% of swap fees)
- Fee tier additions
- Contract upgrades

Any such token will be documented in an updated version of this file.
