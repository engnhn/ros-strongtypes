import { IRouterClient } from '../../api/router-client.interface.js';
import { IpContext } from './ip.context.js';
import { InterfaceContext } from './interface.context.js';

export class RootContext {
    private client: IRouterClient;

    constructor(client: IRouterClient) {
        this.client = client;
    }

    ip(): IpContext {
        return new IpContext(this.client, ['ip']);
    }

    interface(): InterfaceContext {
        return new InterfaceContext(this.client, ['interface']);
    }
}
