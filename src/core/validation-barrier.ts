import { ZodSchema, ZodError } from 'zod';

/**
 * Custom Error class designed to provide structured feedback on validation failures.
 * This encapsulates the low-level Zod issues into a cohesive error report.
 */
export class ValidationError extends Error {
    public issues: any[];

    constructor(message: string, issues: any[]) {
        super(message);
        this.name = 'ValidationError';
        this.issues = issues;
    }
}

/**
 * The Validation Barrier.
 * 
 * This function acts as the primary defense line between the external, untrusted API
 * and the internal, strongly-typed application logic. It enforces the "Fail Fast"
 * principle: if data is corrupt, we crash immediately and strictly, rather than 
 * allowing invalid state to propagate and cause subtle bugs later.
 * 
 * @param schema The Zod schema acting as the contract.
 * @param data The raw, untrusted input.
 * @returns The pure, typed data structure.
 */
export function parseOrThrow<T>(schema: ZodSchema<T>, data: unknown): T {
    const result = schema.safeParse(data);

    if (!result.success) {
        const errorDetails = formatZodError(result.error);
        throw new ValidationError(`Validation failed: ${errorDetails}`, result.error.issues);
    }

    return result.data;
}

/**
 * Validates an array of items, ensuring every single item adheres to the schema.
 * This is crucial for list endpoints (e.g., /interface/print) to ensure mass-integrity.
 */
export function parseArrayOrThrow<T>(schema: ZodSchema<T>, data: unknown[]): T[] {
    if (!Array.isArray(data)) {
        throw new ValidationError("Expected an array response from API", []);
    }
    // We map over the array to validate each item individually 
    // effectively lifting the element schema to an array schema.
    return data.map((item, index) => {
        try {
            return parseOrThrow(schema, item);
        } catch (e) {
            if (e instanceof ValidationError) {
                // Contextualize the error with the index
                throw new ValidationError(`${index}.${e.message}`, e.issues);
            }
            throw e;
        }
    });
}

/**
 * Helper to flatten Zod errors into a human-readable string.
 */
function formatZodError(error: ZodError): string {
    return error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
}
