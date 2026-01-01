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
export class QueryBuilder<TModel = any> {
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
    protected next<TNewModel = TModel>(segment: string): QueryBuilder<TNewModel> {
        // Immutability: We spread the existing path array into a new one.
        return new QueryBuilder<TNewModel>(this.client, [...this.path, segment]);
    }

    /**
     * Executes the 'print' command on the current resource.
     *
     * @param where Filtering criteria (equivalent to RouterOS 'where' clause).
     * @returns A Promise resolving to the list of resources.
     */
    async print(where?: Record<string, string | number | boolean>): Promise<TModel[]> {
        const fullPath = '/' + [...this.path, 'print'].join('/');
        return this.client.execute(fullPath, where);
    }

    /**
     * Executes the 'add' command.
     * Used to create new resources (firewall rules, static leases, etc.).
     */
    async add(params: Record<string, string | number | boolean>): Promise<TModel> {
        const fullPath = '/' + [...this.path, 'add'].join('/');
        return this.client.execute(fullPath, params);
    }

    /**
     * Watches the resource for changes (Live Stream).
     */
    watch(params?: Record<string, string | number | boolean>): Observable<TModel[]> {
        return new Observable<TModel[]>(observer => {
            const fullPath = '/' + [...this.path, 'print'].join('/');
            // Call the client's listen method
            return this.client.listen(fullPath, params, (data) => {
                observer.next(data);
            });
        });
    }

    /**
     * Executes the 'set' command to update a resource.
     * @param id The id of the resource to update (often .id or .name in RouterOS).
     * @param params Properties to update.
     */
    async set(id: string, params: Partial<TModel> & Record<string, any>): Promise<TModel> {
        const fullPath = '/' + [...this.path, 'set'].join('/');
        return this.client.execute(fullPath, { '.id': id, ...params });
    }

    /**
     * Executes the 'remove' command to delete a resource.
     * @param id The id of the resource to remove.
     */
    async remove(id: string): Promise<void> {
        const fullPath = '/' + [...this.path, 'remove'].join('/');
        await this.client.execute(fullPath, { '.id': id });
    }

    /**
     * Convenience method to enable a resource.
     * @param id The id of the resource to enable.
     */
    async enable(id: string): Promise<void> {
        await this.set(id, { disabled: false } as any);
    }

    /**
     * Convenience method to disable a resource.
     * @param id The id of the resource to disable.
     */
    async disable(id: string): Promise<void> {
        await this.set(id, { disabled: true } as any);
    }
}
