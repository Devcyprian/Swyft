# Changelog

All notable changes to Swyft are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Added
- Concentrated liquidity pool contract (Soroban)
- Multi-hop router contract
- Position NFT contract
- TypeScript SDK (`@swyft/sdk`) alpha
- Testnet deployment
- Web UI v0.1 (swap and LP)

---

## [0.2.0] — 2025-07-01

### Added
- Fee collection via `collect()` on position NFTs
- TWAP oracle support (observation ring buffer)
- Pool factory contract for permissionless pool creation

### Changed
- Improved tick bitmap gas efficiency
- SDK: `getQuote()` now returns `priceImpact` field

### Fixed
- Off-by-one error in tick crossing logic
- Router: incorrect fee deduction on exact-output swaps

---

## [0.1.0] — 2025-04-15

### Added
- Initial CLMM pool implementation
- Basic swap functionality (exact input)
- Liquidity mint and burn
- Prisma schema and indexer v0
- Turborepo monorepo setup

---

[Unreleased]: https://github.com/Devcyprian/stellar-clmm-dex/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/Devcyprian/stellar-clmm-dex/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/Devcyprian/stellar-clmm-dex/releases/tag/v0.1.0
