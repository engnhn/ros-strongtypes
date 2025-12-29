import { IRouterClient } from '../api/router-client.interface.js';
import { Observable } from '../core/observable.js';

/**
 * The core implementation of the Fluent Query Builder pattern.
 *
 * This class accumulates command segments (e.g., /ip, /address, /print) to form a
 * complete RouterOS API path. It uses an immutable design: every transformation
 * returns a NEW instance, ensuring that sharing a builder instance (e.g., a base
 * '/ip' builder) is safe across different parts of the application.
 */
export class QueryBuilder {
    protected path: string[];
    protected client: IRouterClient;

    constructor(client: IRouterClient, path: string[] = []) {
        this.client = client;
        this.path = path;
    }

    /**
     * Appends a segment to the command path.
     * Internal helper used by subclasses to extend the path safely.
     */
    protected next(segment: string): QueryBuilder {
        // Immutability: We spread the existing path array into a new one.
        return new QueryBuilder(this.client, [...this.path, segment]);
    }

    /**
     * Executes the 'print' command on the current resource.
     *
     * @param where Filtering criteria (equivalent to RouterOS 'where' clause).
     * @returns A Promise resolving to the list of resources.
     */
    async print(where?: Record<string, string | number | boolean>): Promise<any[]> {
        const fullPath = '/' + [...this.path, 'print'].join('/');
        return this.client.execute(fullPath, where);
    }

    /**
     * Executes the 'add' command.
     * Used to create new resources (firewall rules, static leases, etc.).
     */
    async add(params: Record<string, string | number | boolean>): Promise<any> {
        const fullPath = '/' + [...this.path, 'add'].join('/');
        return this.client.execute(fullPath, params);
    }

    /**
     * Watches the resource for changes (Live Stream).
     */
    watch(params?: Record<string, string | number | boolean>): Observable<any[]> {
        return new Observable<any[]>(observer => {
            const fullPath = '/' + [...this.path, 'print'].join('/');
            // Call the client's listen method
            return this.client.listen(fullPath, params, (data) => {
                observer.next(data);
            });
        });
    }
}
