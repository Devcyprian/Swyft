# Testnet Guide

Swyft is deployed on Stellar Testnet for development and integration testing.

## Testnet Endpoints

| Service | URL |
|---------|-----|
| Soroban RPC | `https://soroban-testnet.stellar.org` |
| Horizon | `https://horizon-testnet.stellar.org` |
| Friendbot | `https://friendbot.stellar.org` |
| Swyft API | `https://api-testnet.swyft.fi` |
| Swyft UI | `https://testnet.swyft.fi` |

## Deployed Contract Addresses (Testnet)

| Contract | Address |
|----------|---------|
| Pool Factory | `CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCNM` |
| Router | `CC7EXWNWNPAM7MKXKB3QX6GZPRJXFLFUIMHSXPKJ6EWF6SWAJDNKOGR` |
| Position NFT | `CBBYPGC7LLMDXABHDQK6XHNBILPJNTZV4CGMXGJXJNV5MMUIVHAQWJ2` |

> Contract addresses are reset periodically on testnet. Check the Swyft Discord for the latest addresses.

## Getting Testnet Funds

Use Friendbot to fund a new testnet account with XLM:

```bash
curl "https://friendbot.stellar.org?addr=<YOUR_PUBLIC_KEY>"
```

Or via the SDK:

```typescript
import { Keypair, StellarSdk } from "@stellar/stellar-sdk";

const pair = Keypair.random();
await fetch(`https://friendbot.stellar.org?addr=${pair.publicKey()}`);
console.log("Public key:", pair.publicKey());
console.log("Secret key:", pair.secret()); // Store securely
```

## Testnet Tokens

The following test tokens are available:

| Token | Issuer |
|-------|--------|
| USDC (test) | `GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5` |
| wBTC (test) | `GDPJALI4AZKUU2W426U5WKMAT6CN3AJRPIIRYR2YM54TL2GDWO5O2MZM` |

## SDK Configuration for Testnet

```typescript
import { SwyftClient } from "@swyft/sdk";

const client = new SwyftClient({
  network: "testnet",
  rpcUrl: "https://soroban-testnet.stellar.org",
  factoryAddress: "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCNM",
});
```

## Known Testnet Limitations

- Network may be reset without notice
- Transaction finality is slower than mainnet (~5–10 s)
- Some analytics features are disabled on testnet
