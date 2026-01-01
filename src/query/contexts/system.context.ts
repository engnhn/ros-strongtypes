import { QueryBuilder } from "../builder.js";
import { IRouterClient } from "../../api/router-client.interface.js";

import { SystemIdentity } from "../../schemas/system-identity.schema.js";
import { SystemResource } from "../../schemas/system/resource.schema.js";

export class SystemContext extends QueryBuilder {
    /**
     * Access to /system/identity commands.
     */
    identity(): SystemIdentityContext {
        return new SystemIdentityContext(this.client, [...this.path, "identity"]);
    }

    /**
     * Access to /system/resource commands.
     */
    resource(): QueryBuilder<SystemResource> {
        return this.next<SystemResource>("resource");
    }

    /**
     * Access to /system/clock commands.
     */
    clock(): QueryBuilder {
        return this.next("clock");
    }
}

export class SystemIdentityContext extends QueryBuilder<SystemIdentity> {
    constructor(client: IRouterClient, path: string[]) {
        super(client, path);
    }

    /**
     * Specific method to set the system identity name.
     */
    async setName(name: string): Promise<SystemIdentity> {
        return this.set('identity', { name });
    }
}
