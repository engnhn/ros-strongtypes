import { z } from 'zod';

/**
 * Schema for /system/identity
 */
export const SystemIdentitySchema = z.object({
    name: z.string().min(1),
});

export type SystemIdentity = z.infer<typeof SystemIdentitySchema>;
