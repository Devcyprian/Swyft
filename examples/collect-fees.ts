/**
 * Collect Fees Example
 *
 * Shows how to query uncollected fees for a position and collect them.
 * Run with: npx ts-node examples/collect-fees.ts
 */

import { Keypair } from "@stellar/stellar-sdk";
import { SwyftClient } from "@swyft/sdk";

const secret = process.env.STELLAR_SECRET_KEY;
if (!secret) throw new Error("STELLAR_SECRET_KEY env var is required");

const POSITION_ID = process.env.POSITION_ID;
if (!POSITION_ID) throw new Error("POSITION_ID env var is required");

const keypair = Keypair.fromSecret(secret);

const client = new SwyftClient({
  network: "testnet",
  rpcUrl: "https://soroban-testnet.stellar.org",
  signer: keypair,
});

async function main() {
  // Query the position
  const position = await client.positions.get(POSITION_ID);

  console.log("Position ID:", position.id);
  console.log("Pool:", position.pool);
  console.log("Tick range:", position.tickLower, "→", position.tickUpper);
  console.log("Liquidity:", position.liquidity.toString());

  // Check uncollected fees
  const fees = await client.positions.getUncollectedFees(POSITION_ID);
  console.log("\nUncollected fees:");
  console.log("  Token 0:", fees.amount0, position.token0Symbol);
  console.log("  Token 1:", fees.amount1, position.token1Symbol);

  if (Number(fees.amount0) === 0 && Number(fees.amount1) === 0) {
    console.log("\nNo fees to collect.");
    return;
  }

  // Collect all fees
  console.log("\nCollecting fees...");
  const result = await client.positions.collect({
    positionId: POSITION_ID,
    recipient: keypair.publicKey(),
    amount0Max: fees.amount0,
    amount1Max: fees.amount1,
  });

  console.log("Fees collected!");
  console.log("Transaction hash:", result.hash);
  console.log("Collected token 0:", result.amount0);
  console.log("Collected token 1:", result.amount1);
}

main().catch(console.error);
