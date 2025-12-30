import { QueryBuilder } from "../builder.js";
import { IRouterClient } from "../../api/router-client.interface.js";

export class FirewallContext extends QueryBuilder {
    constructor(client: IRouterClient, path: string[]) {
        super(client, path);
    }

    filter(): QueryBuilder {
        return this.next("filter");
    }

    nat(): QueryBuilder {
        return this.next("nat");
    }

    addressList(): QueryBuilder {
        return this.next("address-list");
    }
}
