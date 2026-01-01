
import { z } from 'zod';
import { IpSchema, InterfaceNameSchema, SubnetMaskSchema } from '../network-types.schema.js';

export const IpAddressSchema = z.object({
    ".id": z.string(),
    address: z.string().describe("IP/Netmask e.g. 192.168.88.1/24"),
    network: IpSchema,
    interface: InterfaceNameSchema,
    "actual-interface": InterfaceNameSchema.optional(),
    dynamic: z.boolean(),
    disabled: z.boolean(),
    invalid: z.boolean(),
    comment: z.string().optional()
});

export type IpAddress = z.infer<typeof IpAddressSchema>;
