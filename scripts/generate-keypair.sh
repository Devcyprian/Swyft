#!/usr/bin/env bash
# generate-keypair.sh — Generate a new Stellar keypair for development
# Usage: ./scripts/generate-keypair.sh
#
# WARNING: Never use generated keypairs from this script on mainnet
# without securing the secret key appropriately.

set -euo pipefail

# Use stellar CLI if available
if command -v stellar &>/dev/null; then
  echo "Generating keypair using Stellar CLI..."
  stellar keys generate --no-fund dev-key 2>/dev/null || true
  stellar keys address dev-key
  echo "(secret key stored in Stellar CLI keystore — run: stellar keys show dev-key)"
  exit 0
fi

# Fallback: use Node.js with stellar-sdk
if command -v node &>/dev/null; then
  node -e "
const { Keypair } = require('@stellar/stellar-sdk');
const pair = Keypair.random();
console.log('Public key:', pair.publicKey());
console.log('Secret key:', pair.secret());
console.log('');
console.log('Fund on testnet:');
console.log('  curl https://friendbot.stellar.org?addr=' + pair.publicKey());
"
  exit 0
fi

echo "Error: neither 'stellar' CLI nor 'node' found. Install one to generate a keypair."
exit 1
