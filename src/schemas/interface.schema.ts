import { z } from 'zod';
import { InterfaceNameSchema, MacSchema } from './network-types.schema.js';

/**
 * Base properties common to all interfaces.
 */
const BaseInterfaceSchema = z.object({
    id: z.string(),
    name: InterfaceNameSchema,
    running: z.boolean(),
    disabled: z.boolean(),
    mtu: z.number().int().positive(),
    comment: z.string().optional(),
});

/**
 * Schema for Ethernet Interface.
 */
export const EthernetInterfaceSchema = BaseInterfaceSchema.extend({
    type: z.literal('ether'),
    macAddress: MacSchema,
    defaultName: z.string(),
    speed: z.string().optional(),
    fullDuplex: z.boolean().optional(),
});

/**
 * Schema for Bridge Interface.
 */
export const BridgeInterfaceSchema = BaseInterfaceSchema.extend({
    type: z.literal('bridge'),
    macAddress: MacSchema,
    ports: z.array(InterfaceNameSchema),
    vlanFiltering: z.boolean(),
});

/**
 * Schema for Vlan Interface.
 */
export const VlanInterfaceSchema = BaseInterfaceSchema.extend({
    type: z.literal('vlan'),
    vlanId: z.number().int().min(1).max(4094),
    interface: InterfaceNameSchema,
});

/**
 * Union Schema for all interface types.
 * Zod effectively acts as a "Validation Barrier" here.
 */
export const RouterInterfaceSchema = z.discriminatedUnion('type', [
    EthernetInterfaceSchema,
    BridgeInterfaceSchema,
    VlanInterfaceSchema,
]);

export type RouterInterfaceInput = z.input<typeof RouterInterfaceSchema>;
export type RouterInterfaceOutput = z.output<typeof RouterInterfaceSchema>;

export type EthernetInterface = z.infer<typeof EthernetInterfaceSchema>;
export type BridgeInterface = z.infer<typeof BridgeInterfaceSchema>;
export type VlanInterface = z.infer<typeof VlanInterfaceSchema>;
