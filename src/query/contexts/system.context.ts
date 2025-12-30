import { QueryBuilder } from "../builder.js";
import { IRouterClient } from "../../api/router-client.interface.js";

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
    resource(): QueryBuilder {
        return this.next("resource");
    }

    /**
     * Access to /system/clock commands.
     */
    clock(): QueryBuilder {
        return this.next("clock");
    }
}

export class SystemIdentityContext extends QueryBuilder {
    constructor(client: IRouterClient, path: string[]) {
        super(client, path);
    }

    /**
     * Specific method to set the system identity name.
     */
    async setName(name: string): Promise<any> {
        return this.set('identity', { name });
    }
}
