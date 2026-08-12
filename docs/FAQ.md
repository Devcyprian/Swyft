# Frequently Asked Questions

## General

**Q: What is Swyft?**  
Swyft is a concentrated liquidity DEX (CLMM) built on Stellar's Soroban smart contract platform. It allows users to swap tokens and provide liquidity within custom price ranges.

**Q: How is Swyft different from Stellar's built-in DEX?**  
Stellar's native DEX uses a simple order book. Swyft uses a CLMM model (similar to Uniswap v3) where liquidity providers concentrate capital within price ranges, resulting in higher capital efficiency and better swap prices.

**Q: Is Swyft audited?**  
Security audits are in progress. Do not deposit funds you cannot afford to lose until audits are complete and published. See [SECURITY.md](./SECURITY.md).

---

## For Traders

**Q: How do I get the best swap price?**  
The router automatically routes through one or multiple pools to find the best price. Always check the quoted price impact before confirming.

**Q: What slippage tolerance should I use?**  
- Stable pairs (USDC/USDT): 0.1%
- Correlated assets: 0.5%
- Volatile pairs: 1–2%

**Q: Why did my transaction fail?**  
Common reasons:
- Price moved beyond your slippage tolerance — increase it slightly
- Insufficient XLM for transaction fees — top up your account
- Pool liquidity is too thin — try a smaller amount

---

## For Liquidity Providers

**Q: What is a "tick" in a CLMM?**  
Ticks are discrete price points that divide the price space. Each fee tier has a minimum tick spacing. Liquidity is active only between the tick boundaries you choose.

**Q: What happens when the price leaves my range?**  
Your position becomes inactive (earns no fees) and is fully converted to the less valuable token. You can either wait for the price to return or withdraw and reposition.

**Q: How do I collect my fees?**  
Fees accumulate in your position. Call the `collect` function on the position NFT contract, or use the UI's "Collect Fees" button.

**Q: Is there a minimum deposit?**  
No protocol minimum, but very small positions may not be economical after Soroban transaction fees.

---

## Technical

**Q: What network does Swyft run on?**  
Swyft is deployed on Stellar Mainnet. A testnet deployment is also available — see [TESTNET.md](./TESTNET.md).

**Q: Where is the SDK?**  
The TypeScript SDK lives in `packages/sdk`. Install it with:
```
pnpm add @swyft/sdk
```

**Q: Can I run the protocol locally?**  
Yes — see [DEPLOYMENT.md](./DEPLOYMENT.md) for local development setup.

**Q: Where do I report bugs or security issues?**  
Security issues: security@swyft.fi (do not post publicly).  
General bugs: open a GitHub issue using the bug report template.
