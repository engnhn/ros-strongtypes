
import { QueryBuilder } from "../builder.js";
import { IRouterClient } from "../../api/router-client.interface.js";
import { FirewallFilterRule, FirewallNatRule } from "../../schemas/firewall.schema.js";

export class FirewallContext extends QueryBuilder {
    constructor(client: IRouterClient, path: string[]) {
        super(client, path);
    }

    filter(): QueryBuilder<FirewallFilterRule> {
        return this.next<FirewallFilterRule>("filter");
    }

    nat(): QueryBuilder<FirewallNatRule> {
        return this.next<FirewallNatRule>("nat");
    }

    addressList(): QueryBuilder {
        return this.next("address-list");
    }
}
