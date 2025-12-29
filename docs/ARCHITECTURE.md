# ros-strongtypes Architecture

This document outlines the core architectural patterns and design decisions of the `ros-strongtypes` library.

## 1. Design Philosophy

The library is built on four pillars:
1.  **Strict Typing**: No strings attached (pun intended). Every network entity is a distinct type.
2.  **Runtime Integrity**: Since API responses are untrusted, they must be validated at the edge.
3.  **Fluent DX**: The API should feel like writing a sentence, not parsing a manual.
4.  **Reactive State**: Network state is a stream, not a snapshot.

## 2. Core Components

### 2.1. Branded Types (`src/core/types.ts`)
To prevent "Primitive Obsession", we use Branded Types (also known as Opaque Types).
An `IPAddress` is a `string`, but a `string` is NOT an `IPAddress`. This prevents accidental swapping of parameters (e.g., passing a MAC address where an IP is expected).

```typescript
export type IPAddress = string & { readonly __brand: 'IPAddress' };
```

### 2.2. The Validation Barrier (`src/core/validation-barrier.ts`)
We assume all data coming from the RouterOS API is "dirty".
Before any data reaches the user's code, it passes through `Zod` schemas.

- **Input**: `unknown` (JSON from API)
- **Process**: `schema.parse(data)`
- **Output**: `RouterInterface` (Guaranteed to matches the Type) or `ValidationError`

### 2.3. The Query Builder (`src/query/`)
We use the **Builder Pattern** combined with **Context-Aware States**.

- **RootContext**: The entry point. Has methods like `.ip()`, `.interface()`.
- **SubContexts**: `IpContext` only has `.address()`, `.route()`. It does NOT have `.ethernet()`.

This ensures that the user can only construct valid command paths supported by RouterOS.
The builder accumulates the path segments and executes them via the `IRouterClient`.

### 2.4. Asynchronous Sync (`src/core/observable.ts`)
Instead of heavy dependencies like RxJS, we implemented a lightweight `Observable` pattern.
The `watch()` method on the Query Builder creates a subscription to the `MockProvider` (or real provider) 'listen' mechanism, streaming updates as they happen.

## 3. Data Flow

1.  **User** calls `provider.query().interface().watch()`.
2.  **Builder** constructs path `/interface/print`.
3.  **Client** starts listening to the device (e.g., via polling or API streams).
4.  **Raw Data** arrives from device (`{ name: "ether1", ... }`).
5.  **Validation Barrier** validates raw data against `RouterInterfaceSchema`.
6.  **Clean Data** is emitted to the User's observer.
