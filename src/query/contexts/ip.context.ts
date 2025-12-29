import { QueryBuilder } from '../builder.js';
import { IRouterClient } from '../../api/router-client.interface.js';

export class IpContext extends QueryBuilder {
    constructor(client: IRouterClient, path: string[]) {
        super(client, path);
    }

    address(): IpAddressContext {
        return new IpAddressContext(this.client, [...this.path, 'address']);
    }
}

export class IpAddressContext extends QueryBuilder {
    constructor(client: IRouterClient, path: string[]) {
        super(client, path);
    }

    // In Phase 4, we can add specific methods like findByIp(ip: IPAddress) here.
}
