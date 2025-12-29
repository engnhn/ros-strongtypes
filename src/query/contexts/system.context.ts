import { QueryBuilder } from "../builder.js";

export class SystemContext extends QueryBuilder {
    /**
     * Access to /system/identity commands.
     */
    identity(): QueryBuilder {
        return this.next("identity");
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
