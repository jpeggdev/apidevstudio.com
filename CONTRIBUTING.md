# Contributing to API Dev Studio

Thank you for your interest in contributing! Here's how to get started.

## Reporting Bugs

1. Check [existing issues](https://github.com/jpeggdev/api-dev-studio/issues) first
2. Use the bug report template
3. Include: OS, app version, steps to reproduce, expected vs actual behavior
4. Screenshots or screen recordings are extremely helpful

## Suggesting Features

1. Check [existing feature requests](https://github.com/jpeggdev/api-dev-studio/issues?q=label%3Aenhancement)
2. Use the feature request template
3. Explain the use case, not just the solution

## Pull Requests

1. Fork the repo and create a branch from `master`
2. If you've added code, add tests
3. Ensure all tests pass: `bun run test:all`
4. Update documentation if needed
5. Write a clear PR description

## Development Setup

**Prerequisites**: Rust (latest stable), Node.js 18+, Bun, [Tauri prerequisites](https://tauri.app/start/prerequisites/)

```bash
cd desktop
bun install
bun run tauri:dev      # Development
bun run test:all       # Run all tests
```

## Code Style

- Rust: `rustfmt` formatting, `clippy` lints
- TypeScript/React: ESLint + Prettier (config included)
- Commit messages: Conventional Commits (`feat:`, `fix:`, `docs:`, etc.)

## License

By contributing, you agree that your contributions will be licensed under the project license.
