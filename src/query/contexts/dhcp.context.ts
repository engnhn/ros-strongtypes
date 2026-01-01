
import { QueryBuilder } from "../builder.js";
import { IRouterClient } from "../../api/router-client.interface.js";
import { DhcpLease, DhcpServer } from "../../schemas/dhcp.schema.js";

export class DhcpContext extends QueryBuilder {
    constructor(client: IRouterClient, path: string[]) {
        super(client, path);
    }

    server(): DhcpServerContext {
        return new DhcpServerContext(this.client, [...this.path, "server"]);
    }
}

export class DhcpServerContext extends QueryBuilder<DhcpServer> {
    constructor(client: IRouterClient, path: string[]) {
        super(client, path);
    }

    lease(): QueryBuilder<DhcpLease> {
        return this.next<DhcpLease>("lease");
    }
}
