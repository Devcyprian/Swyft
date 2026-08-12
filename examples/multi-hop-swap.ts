/**
 * Multi-hop Swap Example
 *
 * Demonstrates routing a swap through multiple pools when no direct pool exists.
 * e.g. wBTC → XLM → USDC (two hops via 0.30% fee pools)
 *
 * Run with: npx ts-node examples/multi-hop-swap.ts
 */

import { Keypair } from "@stellar/stellar-sdk";
import { SwyftClient, Route, ExactInputMultiHopParams } from "@swyft/sdk";

const secret = process.env.STELLAR_SECRET_KEY;
if (!secret) throw new Error("STELLAR_SECRET_KEY env var is required");

const keypair = Keypair.fromSecret(secret);

const client = new SwyftClient({
  network: "testnet",
  rpcUrl: "https://soroban-testnet.stellar.org",
  signer: keypair,
});

// Testnet tokens
const WBTC = "GDPJALI4AZKUU2W426U5WKMAT6CN3AJRPIIRYR2YM54TL2GDWO5O2MZM:wBTC";
const XLM = "native";
const USDC = "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5:USDC";

async function main() {
  // Find the best route automatically
  const route = await client.router.findBestRoute({
    tokenIn: WBTC,
    tokenOut: USDC,
    amountIn: "0.001", // 0.001 wBTC
  });

  console.log("Best route found:");
  route.path.forEach((hop, i) => {
    console.log(`  Hop ${i + 1}: ${hop.tokenIn} → ${hop.tokenOut} (${hop.feeTier / 100}%)`);
  });
  console.log("Estimated out:", route.amountOut, "USDC");
  console.log("Price impact:", route.priceImpact.toFixed(4), "%");

  // Build explicit path: wBTC → XLM (0.30%) → USDC (0.05%)
  const path: Route = [
    { tokenIn: WBTC, tokenOut: XLM, feeTier: 30 },
    { tokenIn: XLM, tokenOut: USDC, feeTier: 5 },
  ];

  const amountOutMin = (Number(route.amountOut) * 0.99).toFixed(7); // 1% slippage

  const params: ExactInputMultiHopParams = {
    path,
    amountIn: "0.001",
    amountOutMinimum: amountOutMin,
    recipient: keypair.publicKey(),
    deadline: Math.floor(Date.now() / 1000) + 120,
  };

  console.log("\nSubmitting multi-hop swap...");
  const result = await client.swap.exactInputMultiHop(params);

  console.log("Swap successful!");
  console.log("Transaction hash:", result.hash);
  console.log("USDC received:", result.amountOut);
}

main().catch(console.error);
