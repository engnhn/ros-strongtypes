import { InterfaceName, MacAddress } from '../core/types.js';

/**
 * Common properties for all network interfaces.
 */
export interface BaseInterface {
    id: string; // Internal RouterOS ID (e.g., *1)
    name: InterfaceName;
    type: string;
    mtu: number;
    running: boolean;
    disabled: boolean;
    comment?: string;
}

/**
 * Represents a physical Ethernet interface.
 */
export interface EthernetInterface extends BaseInterface {
    type: 'ether';
    macAddress: MacAddress;
    defaultName: string;
    speed?: string; // e.g. "1Gbps"
    fullDuplex?: boolean;
}

/**
 * Represents a Bridge interface.
 */
export interface BridgeInterface extends BaseInterface {
    type: 'bridge';
    macAddress: MacAddress; // MAC address of the bridge itself
    ports: InterfaceName[]; // List of interfaces added to this bridge
    vlanFiltering: boolean;
}

/**
 * Represents a VLAN interface.
 */
export interface VlanInterface extends BaseInterface {
    type: 'vlan';
    vlanId: number;
    interface: InterfaceName; // The parent interface this VLAN is attached to
}

/**
 * Discriminator union type for all supported interfaces.
 */
export type RouterInterface = EthernetInterface | BridgeInterface | VlanInterface;

/**
 * Helper to ensure an object is a valid interface structure (runtime check would go here later).
 */
export function isEthernetInterface(iface: RouterInterface): iface is EthernetInterface {
    return iface.type === 'ether';
}
