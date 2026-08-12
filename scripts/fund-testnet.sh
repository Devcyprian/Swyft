#!/usr/bin/env bash
# fund-testnet.sh — Fund a Stellar testnet account via Friendbot
# Usage: ./scripts/fund-testnet.sh <PUBLIC_KEY>

set -euo pipefail

if [ $# -ne 1 ]; then
  echo "Usage: $0 <STELLAR_PUBLIC_KEY>"
  exit 1
fi

PUBLIC_KEY="$1"

echo "Funding testnet account: $PUBLIC_KEY"

RESPONSE=$(curl -sf "https://friendbot.stellar.org?addr=${PUBLIC_KEY}")

if echo "$RESPONSE" | grep -q '"successful": true'; then
  echo "Account funded successfully."
else
  echo "Error funding account:"
  echo "$RESPONSE"
  exit 1
fi
