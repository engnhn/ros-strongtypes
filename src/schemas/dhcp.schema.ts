import { z } from 'zod';
import { IpSchema, MacSchema, InterfaceNameSchema } from './network-types.schema.js';

/**
 * Schema for DHCP Server Lease
 */
export const DhcpLeaseSchema = z.object({
    ".id": z.string(),
    address: IpSchema,
    "mac-address": MacSchema,
    "client-id": z.string().optional(),
    server: z.string(),
    status: z.enum(['waiting', 'testing', 'authorizing', 'busy', 'offered', 'bound']),
    "last-seen": z.string().optional(),
    "host-name": z.string().optional(),
    dynamic: z.boolean(),
    disabled: z.boolean(),
    comment: z.string().optional(),
});

/**
 * Schema for DHCP Server
 */
export const DhcpServerSchema = z.object({
    ".id": z.string(),
    name: z.string(),
    interface: InterfaceNameSchema,
    "lease-time": z.string(),
    "address-pool": z.string(),
    disabled: z.boolean(),
});

export type DhcpLease = z.infer<typeof DhcpLeaseSchema>;
export type DhcpServer = z.infer<typeof DhcpServerSchema>;
