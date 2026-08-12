#!/usr/bin/env bash
# check-contracts.sh — Verify that deployed contract addresses are reachable
# Usage: ./scripts/check-contracts.sh [testnet|mainnet]

set -euo pipefail

NETWORK="${1:-testnet}"

if [ "$NETWORK" = "testnet" ]; then
  RPC_URL="https://soroban-testnet.stellar.org"
  FACTORY="CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCNM"
  ROUTER="CC7EXWNWNPAM7MKXKB3QX6GZPRJXFLFUIMHSXPKJ6EWF6SWAJDNKOGR"
elif [ "$NETWORK" = "mainnet" ]; then
  RPC_URL="https://soroban-mainnet.stellar.org"
  FACTORY="${MAINNET_FACTORY_ADDRESS:-}"
  ROUTER="${MAINNET_ROUTER_ADDRESS:-}"
  if [ -z "$FACTORY" ] || [ -z "$ROUTER" ]; then
    echo "Set MAINNET_FACTORY_ADDRESS and MAINNET_ROUTER_ADDRESS env vars."
    exit 1
  fi
else
  echo "Unknown network: $NETWORK (use testnet or mainnet)"
  exit 1
fi

check_contract() {
  local name="$1"
  local address="$2"
  echo -n "Checking $name ($address)... "
  STATUS=$(curl -sf -X POST "$RPC_URL" \
    -H "Content-Type: application/json" \
    -d "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"getContractData\",\"params\":{\"contract\":\"$address\",\"key\":\"AAAAA==\",\"durability\":\"persistent\"}}" \
    | python3 -c "import sys,json; d=json.load(sys.stdin); print('OK' if 'result' in d else 'NOT FOUND')" 2>/dev/null || echo "ERROR")
  echo "$STATUS"
}

echo "=== Contract Health Check ($NETWORK) ==="
check_contract "Pool Factory" "$FACTORY"
check_contract "Router" "$ROUTER"
echo "Done."
