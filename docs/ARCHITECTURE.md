# System Architecture

Swyft is a concentrated liquidity DEX built on Stellar's smart contract platform (Soroban). This document describes the high-level architecture and component relationships.

## Overview

```
┌─────────────────────────────────────────────────┐
│                  Frontend (Next.js)              │
│           apps/web  ·  apps/mobile               │
└────────────────────┬────────────────────────────┘
                     │ REST / WebSocket
┌────────────────────▼────────────────────────────┐
│                  API Server (Fastify)            │
│                  apps/api                        │
│  ┌─────────────┐  ┌──────────────┐              │
│  │  Price Feed │  │  Indexer     │              │
│  └─────────────┘  └──────────────┘              │
└────────────────────┬────────────────────────────┘
                     │ Soroban RPC / Horizon
┌────────────────────▼────────────────────────────┐
│              Stellar / Soroban                   │
│  ┌──────────┐  ┌────────┐  ┌────────────────┐  │
│  │ Pool     │  │ Router │  │ Position NFT   │  │
│  │ Contract │  │        │  │ Contract       │  │
│  └──────────┘  └────────┘  └────────────────┘  │
└─────────────────────────────────────────────────┘
```

## Monorepo Layout

```
stellar-clmm-dex/
├── apps/
│   ├── web/          # Next.js frontend
│   ├── api/          # Fastify API server
│   └── indexer/      # Soroban event indexer
├── packages/
│   ├── sdk/          # TypeScript SDK
│   ├── contracts/    # Soroban smart contracts (Rust)
│   ├── ui/           # Shared React components
│   └── config/       # Shared configs (ESLint, TS)
├── prisma/           # Database schema & migrations
├── docs/             # Documentation
└── examples/         # Usage examples
```

## Smart Contract Layer

### Pool Contract

The core pool contract manages:
- Token reserves and sqrt price
- Tick bitmap and individual tick state
- Fee growth accumulators
- Position tracking per LP

### Router Contract

Handles multi-hop swap routing:
- Finds optimal path between tokens
- Executes atomic multi-pool swaps
- Enforces slippage limits

### Position NFT Contract

Each LP position is represented as a unique NFT:
- Tracks tick range (tickLower, tickUpper)
- Records liquidity amount
- Stores uncollected fee snapshots

## Off-chain Layer

### Indexer

Subscribes to Soroban events and writes to PostgreSQL:
- Pool state snapshots
- Swap history
- Position mint/burn events

### API Server

Exposes REST endpoints:
- `/pools` — list and filter pools
- `/quotes` — off-chain swap quotes
- `/positions` — LP position data
- `/analytics` — volume and TVL metrics

## Data Flow: Swap

1. User requests quote via API
2. API queries pool state from DB (cached)
3. Frontend displays quote with slippage warning
4. User signs Soroban transaction
5. Router contract executes swap on-chain
6. Indexer picks up `Swap` event
7. DB updated; UI refreshes

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Smart contracts | Rust (Soroban SDK) |
| Backend | TypeScript, Fastify, Prisma |
| Frontend | Next.js 14, Tailwind CSS |
| DB | PostgreSQL |
| Tooling | pnpm, Turborepo, esbuild |
