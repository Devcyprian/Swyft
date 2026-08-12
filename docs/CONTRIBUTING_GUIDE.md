# Contributing Guide

Thank you for your interest in contributing to Swyft! This guide covers everything you need to get started.

## Ways to Contribute

- Report bugs via GitHub Issues (use the bug report template)
- Suggest features via GitHub Issues (use the feature request template)
- Submit pull requests for bug fixes or improvements
- Improve documentation
- Help with testnet validation

## Development Setup

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full setup instructions.

Quick start:

```bash
git clone https://github.com/Devcyprian/stellar-clmm-dex.git
cd stellar-clmm-dex
pnpm install
cp .env.example .env
pnpm dev
```

## Pull Request Process

1. **Fork** the repository and create a branch from `main`
2. **Name your branch** descriptively: `feat/add-limit-orders`, `fix/tick-overflow`
3. **Make your changes** in small, focused commits
4. **Write or update tests** for your changes
5. **Ensure all checks pass** locally: `pnpm lint && pnpm typecheck`
6. **Open a PR** using the PR template
7. **Request review** from a maintainer

## Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>

[optional body]
```

Types: `feat`, `fix`, `docs`, `chore`, `refactor`, `perf`, `test`

Examples:
```
feat(sdk): add getQuote method with price impact calculation
fix(contracts): correct fee accumulation on tick crossing
docs: update POOLS.md with TWAP example
```

## Code Style

- TypeScript: follow existing patterns; run `pnpm lint` before committing
- Rust (contracts): run `cargo fmt` and `cargo clippy` before committing
- No `console.log` in production code; use the logger utility

## Reporting Security Issues

See [SECURITY.md](../SECURITY.md). Do not open public issues for vulnerabilities.

## Code of Conduct

Be respectful and constructive. We follow the [Contributor Covenant](https://www.contributor-covenant.org/) v2.1.
