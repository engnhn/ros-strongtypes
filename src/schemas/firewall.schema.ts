import { z } from 'zod';
import { IpSchema, InterfaceNameSchema, PortNumberSchema } from './network-types.schema.js';

export const FirewallActionSchema = z.enum([
    'accept', 'add-dst-to-address-list', 'add-src-to-address-list', 'drop',
    'fasttrack-connection', 'jump', 'log', 'passthrough', 'reject',
    'return', 'tarpit'
]);

export const FirewallChainSchema = z.enum(['input', 'forward', 'output', 'postrouting', 'prerouting']);

/**
 * Schema for IP Firewall Filter Rule
 */
export const FirewallFilterRuleSchema = z.object({
    ".id": z.string().optional(),
    chain: FirewallChainSchema,
    action: FirewallActionSchema,
    "src-address": IpSchema.optional(),
    "dst-address": IpSchema.optional(),
    protocol: z.string().optional(),
    "src-port": PortNumberSchema.optional(),
    "dst-port": PortNumberSchema.optional(),
    "in-interface": InterfaceNameSchema.optional(),
    "out-interface": InterfaceNameSchema.optional(),
    comment: z.string().optional(),
    disabled: z.boolean(),
});

/**
 * Schema for IP Firewall NAT Rule
 */
export const FirewallNatRuleSchema = z.object({
    ".id": z.string().optional(),
    chain: z.enum(['srcnat', 'dstnat']),
    action: z.enum(['masquerade', 'dst-nat', 'src-nat', 'redirect']),
    "src-address": IpSchema.optional(),
    "dst-address": IpSchema.optional(),
    "to-addresses": IpSchema.optional(),
    "to-ports": PortNumberSchema.optional(),
    protocol: z.string().optional(),
    "dst-port": PortNumberSchema.optional(),
    "out-interface": InterfaceNameSchema.optional(),
    comment: z.string().optional(),
    disabled: z.boolean(),
});

export type FirewallFilterRule = z.infer<typeof FirewallFilterRuleSchema>;
export type FirewallNatRule = z.infer<typeof FirewallNatRuleSchema>;
