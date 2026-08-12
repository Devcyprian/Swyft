/**
 * List Pools Example
 *
 * Fetches and displays all active pools from the Swyft API.
 * Run with: npx ts-node examples/list-pools.ts
 */

import { SwyftClient } from "@swyft/sdk";

const client = new SwyftClient({
  network: "testnet",
  rpcUrl: "https://soroban-testnet.stellar.org",
});

async function main() {
  const pools = await client.pools.list({ sortBy: "tvl", limit: 10 });

  console.log(`Found ${pools.length} pools:\n`);
  console.log(
    "Address".padEnd(58),
    "Pair".padEnd(20),
    "Fee".padEnd(8),
    "TVL (USD)".padEnd(14),
    "Vol 24h (USD)"
  );
  console.log("-".repeat(120));

  for (const pool of pools) {
    console.log(
      pool.address.padEnd(58),
      `${pool.token0Symbol}/${pool.token1Symbol}`.padEnd(20),
      `${pool.feeTier / 100}%`.padEnd(8),
      `$${Number(pool.tvlUsd).toLocaleString()}`.padEnd(14),
      `$${Number(pool.volume24hUsd).toLocaleString()}`
    );
  }
}

main().catch(console.error);
