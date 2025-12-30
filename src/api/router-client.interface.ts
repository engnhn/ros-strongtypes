import { RouterInterface } from '../models/interfaces.js';
import { InterfaceName } from '../core/types.js';
import type { RootContext } from '../query/contexts/root.context.js';

/**
 * Abstract Provider Interface for RouterOS communication.
 * Allows decoupling the core logic from the internal API implementation (RoS API, SSH, HTTP).
 */
export interface IRouterClient {
    /**
     * Connects to the router.
     */
    connect(): Promise<void>;

    /**
     * Disconnects from the router.
     */
    disconnect(): Promise<void>;

    /**
     * Retrieves a list of all interfaces.
     */
    getInterfaces(): Promise<RouterInterface[]>;

    /**
     * Retrieves a specific interface by name.
     */
    getInterface(name: InterfaceName): Promise<RouterInterface | null>;

    /**
     * Returns a query builder instance for constructing RouterOS commands.
     * @returns A query builder instance.
     */
    query(): RootContext;

    /**
     * Generic command executor (placeholder for Phase 3 Query Builder).
     * @param command The command path (e.g., "/ip/address/print")
     * @param args Arguments for the command
     */
    execute(command: string, args?: Record<string, string | number | boolean>): Promise<any>;

    /**
     * Listens for changes on a specific resource path.
     * @param command The command path (e.g., "/interface/print")
     * @param args Optional arguments (e.g., filtering)
     * @param callback Function to call when data arrives
     * @returns A function to stop listening (unsubscribe)
     */
    listen(
        command: string,
        args: Record<string, string | number | boolean> | undefined,
        callback: (data: any) => void
    ): () => void;
}
