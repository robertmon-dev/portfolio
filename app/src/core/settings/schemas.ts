import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('4000'),

  DATABASE_URL: z.string().url(),
  GITHUB_TOKEN: z.string().optional(),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
  NICKNAME: z.string(),
  JWT_SECRET: z.string(),

  REDIS_TLS_ENABLED: z.string().default('false').transform((s) => s === 'true'),
  REDIS_CA_PATH: z.string().optional().nullable(),
  REDIS_URL: z.string(),
  DB_TLS_ENABLED: z.string().default('false').transform((s) => s === 'true'),
  DB_CA_PATH: z.string().optional().nullable(),
  APP_URL: z.string().url().default('http://localhost:3000'),

  MAIL_HOST: z.string(),
  MAIL_PORT: z.string().transform(Number).default('587'),
  MAIL_USER: z.string(),
  MAIL_PASS: z.string(),
  MAIL_FROM: z.string().email(),
});
