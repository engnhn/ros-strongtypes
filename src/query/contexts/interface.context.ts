
import { QueryBuilder } from '../builder.js';
import { IRouterClient } from '../../api/router-client.interface.js';
import { EthernetInterface } from '../../schemas/interface.schema.js';

/**
 * Context for commands under /interface
 */
export class InterfaceContext extends QueryBuilder {
    constructor(client: IRouterClient, path: string[]) {
        super(client, path);
    }

    // Specific commands for /interface can be added here
    // For now, it inherits generic print/add/etc.

    /**
     * Navigate to /interface/ethernet
     */
    ethernet(): EthernetContext {
        return new EthernetContext(this.client, [...this.path, 'ethernet']);
    }
}

export class EthernetContext extends QueryBuilder<EthernetInterface> {
    constructor(client: IRouterClient, path: string[]) {
        super(client, path);
    }
}
