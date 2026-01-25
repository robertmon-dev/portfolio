import { z } from 'zod';

export const HealthResponseSchema = z.object({
  status: z.enum(['ok', 'error']),
  uptime: z.number(),
  timestamp: z.string(),
  database: z.object({
    connected: z.boolean(),
    message: z.string(),
  }),
  redis: z.object({
    connected: z.boolean()
  })
});

