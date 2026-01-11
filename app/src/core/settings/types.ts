import { z } from 'zod';
import { envSchema } from './schemas';

export type EnvConfig = z.infer<typeof envSchema>;

