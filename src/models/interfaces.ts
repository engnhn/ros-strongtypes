export {
    EthernetInterface,
    BridgeInterface,
    VlanInterface,
    RouterInterfaceOutput as RouterInterface
} from '../schemas/interface.schema.js';

import { RouterInterfaceOutput, EthernetInterface } from '../schemas/interface.schema.js';

/**
 * Common properties for all network interfaces.
 * (Note: BaseInterface is not exported from schema, but we can verify if it's needed externally.
 * If strictly needed, we should export it from schema or define a partial here, but for now removing to avoid conflict if not used)
 */

/**
 * Helper to ensure an object is a valid interface structure (runtime check would go here later).
 */
export function isEthernetInterface(iface: RouterInterfaceOutput): iface is EthernetInterface {
    return iface.type === 'ether';
}
