/**
 * Establishes Nominal Typing within TypeScript's Structural Type System.
 *
 * Branded Types (or Opaque Types) allow us to distinguish between two strings
 * (e.g., an IP Address and a MAC Address) at compile-time, preventing accidental
 * assignment of semantically different but structurally identical, values.
 */
export type Brand<K, T> = K & { readonly __brand: T };

/**
 * Represents a formally validated IPv4 address.
 * Use `isIPAddress` or `asIPAddress` to enforce this contract at runtime.
 */
export type IPAddress = string & { readonly __brand: 'IPAddress' };

/**
 * Represents a Subnet Mask (e.g., 255.255.255.0).
 * Distinct from generic strings to ensure correct network configuration contexts.
 */
export type SubnetMask = string & { readonly __brand: 'SubnetMask' };

/**
 * Represents a validated MAC Address (Hardware Address).
 */
export type MacAddress = string & { readonly __brand: 'MacAddress' };

/**
 * Represents a generic Port Number (1-65535).
 */
export type PortNumber = number & { readonly __brand: 'PortNumber' };

/**
 * Represents a RouterOS Interface Name.
 * Prevents arbitrary strings from being passed to interface-specific API calls.
 */
export type InterfaceName = string & { readonly __brand: 'InterfaceName' };

/* -------------------------------------------------------------------------- */
/* Runtime Type Guards & Assertion Functions                                  */
/* -------------------------------------------------------------------------- */

/**
 * Type Guard: Verifies if the string conforms to the IPv4 format.
 * This is the runtime companion to the static `IPAddress` type.
 */
export function isIPAddress(value: string): value is IPAddress {
    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    return ipRegex.test(value);
}

/**
 * Assertion: Promotes a string to `IPAddress` if valid, otherwise throws.
 * Used when 'Fail-Fast' behavior is desired for invalid inputs.
 */
export function asIPAddress(value: string): IPAddress {
    if (!isIPAddress(value)) {
        throw new Error(`Invariant Violation: Invalid IP Address format: ${value}`);
    }
    return value as IPAddress;
}

export function isMacAddress(value: string): value is MacAddress {
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    return macRegex.test(value);
}

export function asMacAddress(value: string): MacAddress {
    if (!isMacAddress(value)) {
        throw new Error(`Invariant Violation: Invalid MAC Address format: ${value}`);
    }
    return value as MacAddress;
}

/**
 * Enforces non-empty constraints on Interface Names.
 */
export function asInterfaceName(value: string): InterfaceName {
    if (!value || value.trim().length === 0) {
        throw new Error("Invariant Violation: Interface name cannot be empty");
    }
    return value as InterfaceName;
}
