import { z } from 'zod';
import { IPAddress, MacAddress, InterfaceName } from '../core/types.js';

/**
 * Zod schema for IP Address validation.
 * Using regex because standard Zod IP validation might be version dependent.
 */
export const IpSchema = z.string().regex(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/, {
    message: "Invalid IP Address format"
});

/**
 * Zod schema for MAC Address validation.
 */
export const MacSchema = z.string().regex(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, {
    message: "Invalid MAC Address format"
});

/**
 * Zod schema for Interface Name validation.
 * Must be non-empty string.
 */
export const InterfaceNameSchema = z.string().min(1);

/**
 * Zod schema for Port Number.
 */
export const PortNumberSchema = z.number().int().min(1).max(65535);

/**
 * Helper to parse and assert IPAddress type.
 */
export const parseIp = (val: unknown): IPAddress => {
    return IpSchema.parse(val) as IPAddress;
}

/**
 * Helper to parse and assert MacAddress type.
 */
export const parseMac = (val: unknown): MacAddress => {
    return MacSchema.parse(val) as MacAddress;
}

/**
 * Helper to parse and assert InterfaceName type.
 */
export const parseInterfaceName = (val: unknown): InterfaceName => {
    return InterfaceNameSchema.parse(val) as InterfaceName;
}
