/**
 * Basic Swap Example
 *
 * Demonstrates how to execute a simple token swap using the Swyft SDK.
 * Run with: npx ts-node examples/basic-swap.ts
 */

import { Keypair } from "@stellar/stellar-sdk";
import { SwyftClient, ExactInputParams } from "@swyft/sdk";

// Load your secret key from environment — never hardcode secrets
const secret = process.env.STELLAR_SECRET_KEY;
if (!secret) throw new Error("STELLAR_SECRET_KEY env var is required");

const keypair = Keypair.fromSecret(secret);

const client = new SwyftClient({
  network: "testnet",
  rpcUrl: "https://soroban-testnet.stellar.org",
  signer: keypair,
});

// Token addresses (testnet)
const USDC = "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5:USDC";
const XLM = "native";

async function main() {
  // 1. Get a quote
  const quote = await client.getQuote({
    tokenIn: XLM,
    tokenOut: USDC,
    amountIn: "100", // 100 XLM
    feeTier: 30,
  });

  console.log("Quoted amount out:", quote.amountOut, "USDC");
  console.log("Price impact:", quote.priceImpact.toFixed(4), "%");

  if (Number(quote.priceImpact) > 1) {
    console.warn("Warning: price impact is high. Reduce trade size or split.");
  }

  // 2. Execute the swap with 0.5% slippage tolerance
  const minAmountOut = (Number(quote.amountOut) * 0.995).toFixed(7);

  const params: ExactInputParams = {
    tokenIn: XLM,
    tokenOut: USDC,
    amountIn: "100",
    amountOutMinimum: minAmountOut,
    recipient: keypair.publicKey(),
    deadline: Math.floor(Date.now() / 1000) + 60, // 60 seconds
  };

  console.log("\nSubmitting swap...");
  const result = await client.swap.exactInput(params);

  console.log("Swap successful!");
  console.log("Transaction hash:", result.hash);
  console.log("Amount out:", result.amountOut, "USDC");
}

main().catch(console.error);
