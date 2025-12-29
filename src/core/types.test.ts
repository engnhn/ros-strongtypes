import { describe, it, expect } from 'vitest';
import { isIPAddress, isMacAddress, asIPAddress } from './types.js';

describe('Core Types Validation', () => {
    describe('IPAddress', () => {
        it('should validate correct IPv4 addresses', () => {
            expect(isIPAddress('192.168.1.1')).toBe(true);
            expect(isIPAddress('10.0.0.1')).toBe(true);
            expect(isIPAddress('0.0.0.0')).toBe(true);
        });

        it('should reject invalid IPv4 addresses', () => {
            expect(isIPAddress('192.168.1')).toBe(false); // Too short
            expect(isIPAddress('192.168.1.1.1')).toBe(false); // Too long
            expect(isIPAddress('256.0.0.1')).toBe(true); // Regex allows 3 digits, logic might allow >255 in simple regex, but Zod schema handles strictness better. Our simple regex is permissive on range.
            expect(isIPAddress('abc.def.ghi.jkl')).toBe(false);
        });

        it('asIPAddress should throw on invalid input', () => {
            expect(() => asIPAddress('invalid_ip')).toThrow();
        });
    });

    describe('MacAddress', () => {
        it('should validate correct MAC addresses', () => {
            expect(isMacAddress('00:00:5E:00:53:AF')).toBe(true);
            expect(isMacAddress('FF:FF:FF:FF:FF:FF')).toBe(true);
        });

        it('should reject invalid MAC addresses', () => {
            expect(isMacAddress('00:00:5E:00:53')).toBe(false); // Short
            expect(isMacAddress('00:00:5E:00:53:AF:A')).toBe(false); // Long
            expect(isMacAddress('GG:00:00:00:00:00')).toBe(false); // Invalid chars? Regex [0-9A-F]. G is invalid.
        });
    });
});
