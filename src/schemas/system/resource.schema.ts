
import { z } from 'zod';

export const SystemResourceSchema = z.object({
    uptime: z.string(),
    version: z.string(),
    "build-time": z.string(),
    "free-memory": z.number(),
    "total-memory": z.number(),
    cpu: z.string(),
    "cpu-count": z.number(),
    "cpu-frequency": z.number(),
    "cpu-load": z.number(),
    "free-hdd-space": z.number(),
    "total-hdd-space": z.number(),
    "architecture-name": z.string(),
    "board-name": z.string(),
    platform: z.string(),
});

export type SystemResource = z.infer<typeof SystemResourceSchema>;
