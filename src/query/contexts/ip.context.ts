import { QueryBuilder } from '../builder.js';
import { IRouterClient } from '../../api/router-client.interface.js';
import { DhcpContext } from './dhcp.context.js';
import { FirewallContext } from './firewall.context.js';

import { IpAddress } from '../../schemas/ip/address.schema.js';

export class IpContext extends QueryBuilder {
    constructor(client: IRouterClient, path: string[]) {
        super(client, path);
    }

    address(): IpAddressContext {
        return new IpAddressContext(this.client, [...this.path, 'address']);
    }

    dhcp(): DhcpContext {
        return new DhcpContext(this.client, [...this.path, 'dhcp-server']);
    }

    firewall(): FirewallContext {
        return new FirewallContext(this.client, [...this.path, 'firewall']);
    }
}

export class IpAddressContext extends QueryBuilder<IpAddress> {
    constructor(client: IRouterClient, path: string[]) {
        super(client, path);
    }

    // In Phase 4, we can add specific methods like findByIp(ip: IPAddress) here.
}
