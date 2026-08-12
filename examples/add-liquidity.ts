/**
 * Add Liquidity Example
 *
 * Shows how to mint a new concentrated liquidity position on Swyft.
 * Run with: npx ts-node examples/add-liquidity.ts
 */

import { Keypair } from "@stellar/stellar-sdk";
import { SwyftClient, encodeSqrtPrice, tickFromPrice } from "@swyft/sdk";

const secret = process.env.STELLAR_SECRET_KEY;
if (!secret) throw new Error("STELLAR_SECRET_KEY env var is required");

const keypair = Keypair.fromSecret(secret);

const client = new SwyftClient({
  network: "testnet",
  rpcUrl: "https://soroban-testnet.stellar.org",
  signer: keypair,
});

const USDC = "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5:USDC";
const XLM = "native";

async function main() {
  // Load the XLM/USDC pool (0.30% fee tier)
  const pool = await client.pools.get({ tokenA: XLM, tokenB: USDC, feeTier: 30 });
  console.log("Pool address:", pool.address);
  console.log("Current tick:", pool.state.currentTick);

  // Define price range: ±10% around current price
  const currentPrice = pool.state.price; // price of XLM in USDC
  const lowerPrice = currentPrice * 0.9;
  const upperPrice = currentPrice * 1.1;

  const tickLower = tickFromPrice(lowerPrice, pool.tickSpacing);
  const tickUpper = tickFromPrice(upperPrice, pool.tickSpacing);

  console.log(`\nAdding liquidity in range: ${lowerPrice.toFixed(4)} – ${upperPrice.toFixed(4)} USDC/XLM`);
  console.log(`Ticks: ${tickLower} → ${tickUpper}`);

  // Mint 50 USDC worth of liquidity
  const { amount0, amount1, positionId } = await client.positions.mint({
    pool: pool.address,
    tickLower,
    tickUpper,
    amount0Desired: "50",      // USDC
    amount1Desired: "500",     // XLM (approximate, will be adjusted)
    amount0Min: "49",
    amount1Min: "490",
    recipient: keypair.publicKey(),
    deadline: Math.floor(Date.now() / 1000) + 120,
  });

  console.log("\nPosition minted!");
  console.log("Position NFT ID:", positionId);
  console.log("USDC deposited:", amount0);
  console.log("XLM deposited:", amount1);
}

main().catch(console.error);
