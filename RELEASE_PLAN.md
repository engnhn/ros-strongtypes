# Conceptual Release Plan - ros-strongtypes

This document outlines the roadmap for the next major release of `ros-strongtypes`.

## v1.1.0: "Expanding the Vocabulary"

### 1. Expanded Query Verbs
Currently, the `QueryBuilder` only supports `print`, `add`, and `watch`. We will add:
- `set(id: string, params: Record<string, any>)`: Modify existing resources.
- `remove(id: string)`: Delete resources.
- `enable(id: string)` / `disable(id: string)`: Convenience wrappers for common state toggles.

### 2. Type Ergonomics (Phase 4 Cleanup)
- **Typed Entry Point**: Update `IRouterClient.query()` and `RootContext` to ensure the entry point is fully typed, removing `any` casts in user code.
- **Generic Contexts**: Refactor contexts to be more generic where possible while maintaining strict type safety for specific paths.

### 3. New Resource Schemas & Contexts
- **IP Firewall**: Implementation of `/ip/firewall/filter` and `/ip/firewall/nat`.
- **DHCP Server**: Implementation of `/ip/dhcp-server` and `/ip/dhcp-server/lease`.
- **System Identity**: Full support for `/system/identity` (currently just a placeholder).

## v2.0.0: "Network Intelligence"

### 1. Multi-Router Coordination
- Abstractions for managing multiple routers simultaneously.
- Atomic updates across multiple devices (where supported by high-level drivers).

### 2. Schema Plugin System
- Allow users to register custom Zod schemas for non-standard RouterOS modules or third-party packages.

### 3. Advanced Validation Barrier
- Conditional validation (e.g., validate `vlan-id` only if `vlan-filtering` is enabled on a bridge).
