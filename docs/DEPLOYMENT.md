# Deployment Guide

This guide covers how to deploy Swyft locally for development, as well as how contracts are deployed to Stellar Testnet and Mainnet.

## Prerequisites

- Node.js >= 18
- pnpm >= 8
- Rust + `cargo` (for contract compilation)
- Stellar CLI (`stellar`)
- A funded Stellar account (for testnet: use Friendbot)
- Docker (for local PostgreSQL)

## Local Development

### 1. Clone and install

```bash
git clone https://github.com/Devcyprian/stellar-clmm-dex.git
cd stellar-clmm-dex
pnpm install
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env with your values
```

### 3. Start local services

```bash
# Start PostgreSQL via Docker
docker compose up -d

# Run database migrations
pnpm prisma migrate dev

# Start the API and frontend in dev mode
pnpm dev
```

### 4. Generate a testnet keypair

```bash
./scripts/generate-keypair.sh
./scripts/fund-testnet.sh <YOUR_PUBLIC_KEY>
```

## Contract Deployment

### Compile contracts

```bash
cd packages/contracts
cargo build --target wasm32-unknown-unknown --release
stellar contract optimize --wasm target/wasm32-unknown-unknown/release/swyft_pool.wasm
```

### Deploy to Testnet

```bash
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/swyft_pool.optimized.wasm \
  --source <YOUR_SECRET_KEY> \
  --network testnet
```

### Verify contract deployment

```bash
./scripts/check-contracts.sh testnet
```

### Deploy to Mainnet

Mainnet deployment requires a multisig ceremony. Contact the core team to participate.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `STELLAR_RPC_URL` | Soroban RPC endpoint | Yes |
| `STELLAR_NETWORK` | `testnet` or `mainnet` | Yes |
| `POOL_FACTORY_ADDRESS` | Deployed factory contract address | Yes |
| `ROUTER_ADDRESS` | Deployed router contract address | Yes |
| `JWT_SECRET` | Secret for API auth tokens | API only |

See `.env.example` for a full template.

## Docker

A `docker-compose.yml` is provided for local database and Redis:

```bash
docker compose up -d
```

## CI/CD

GitHub Actions workflows live in `.github/workflows/`. They run on every PR:
- Lint and type-check
- Unit tests
- Contract compilation check
