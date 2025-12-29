# ros-strongtypes

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/language-TypeScript-3178C6.svg)
![Stability](https://img.shields.io/badge/stability-production--grade-green.svg)
![Validation](https://img.shields.io/badge/validation-zod-3068b7.svg)
![Code Style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

> "Production has a way of teaching humility."

**ros-strongtypes** is a "boring solution" to a chaotic problem: Managing Mikrotik RouterOS devices programmatically without blowing things up. It enforces strict type safety and runtime validation at the network edge, turning unpredictable API responses into reliable, typed objects.

## The Problem

RouterOS APIs are powerful but loosely typed. A string can be an IP address, a MAC address, or an interface name. A command path can be constructed incorrectly. When managing critical network infrastructure, these "clever" dynamicisms are liabilities.

We don't want "clever" code that guesses what the router meant. We want code that knows exactly what it's dealing with—or crashes loudly (Fail-Fast) before applying a broken config.

## The Solution

This library is built on honest constraints:

1.  **Nominal Typing (Branded Types)**: An `IPAddress` is not just a `string`. You cannot accidentally pass a MAC address to a function expecting an IP.
2.  **Runtime Integrity (Validation Barrier)**: All data entering the system is treated as "hostile" until validated against strict Zod schemas.
3.  **Fluent, Predictable API**: A query builder that guides you down valid command paths (`.ip().address()`) and restricts you from invalid ones.

## Architecture

We favor explicit design over implicit magic.

- **[Architecture.md](docs/ARCHITECTURE.md)**: A deep dive into the four pillars of the library (Branded Types, Validation Barrier, Query Builder, Observable Sync).
- **[Architecture.md](docs/ARCHITECTURE.md)**: A deep dive into the four pillars of the library (Branded Types, Validation Barrier, Query Builder, Observable Sync).
- **API Reference**: Run `npm run docs` locally to generate and view the full API documentation in `docs/html`.

## Installation

```bash
# Install directly from GitHub
npm install github:engnhn/ros-strongtypes

# Or clone and build locally
git clone https://github.com/engnhn/ros-strongtypes.git
cd ros-strongtypes
npm install
npm run build
```

## Usage

### 1. Basic Integration
(See [examples/basic-usage.ts](examples/basic-usage.ts) for a runnable script)

```typescript
import { RootContext, IRouterClient } from 'ros-strongtypes';

// Bring your own low-level client (e.g., node-routeros, axios, ssh2)
const client: IRouterClient = new MyLowLevelClient();
const app = new RootContext(client);

// Type-safe command construction
// The compiler guarantees you can't access .ethernet() under .ip()
await app.interface().ethernet().print();
```

### 2. Live State Monitoring
Network state is a stream, not a snapshot.

```typescript
app.interface().ethernet().watch().subscribe(interfaces => {
    const ether1 = interfaces.find(i => i.name === 'ether1');
    console.log(`Traffic: ${ether1['rx-byte']} bytes`);
});
```

## Development

I write code, break it, and then fix it. Here's how to do the same:

```bash
# Install dependencies
npm install

# Run Unit Tests (Vitest)
npm test

# Build the project
npm run build
```

## Contributing

Complexity is the enemy. Keep PRs simple, boring, and robust.

## License

MIT
