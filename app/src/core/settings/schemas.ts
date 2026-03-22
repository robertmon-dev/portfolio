import { z } from "zod";

export const envSchema = z
  .object({
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    PORT: z.string().transform(Number).default(8800),

    DATABASE_URL: z.string().url(),
    DB_TLS_ENABLED: z
      .string()
      .default("false")
      .transform((s) => s === "true"),
    DB_CA_PATH: z.string().optional().nullable(),

    REDIS_URL: z.string(),
    REDIS_TLS_ENABLED: z
      .string()
      .default("false")
      .transform((s) => s === "true"),
    REDIS_CA_PATH: z.string().optional().nullable(),

    JWT_SECRET: z.string().min(32),
    NICKNAME: z.string(),

    ROOT_EMAIL: z.string().email().default("admin@example.com"),
    ROOT_PASSWORD: z.string().min(8).default("admin1234"),
    ROOT_USERNAME: z.string().default("root"),

    LOG_LEVEL: z
      .enum(["fatal", "error", "warn", "info", "debug", "trace"])
      .default("info"),
    APP_URL: z.string().url().default("http://localhost:8800"),

    GITHUB_TOKEN: z.string().min(1, "GitHub Token is required for sync"),

    MAIL_HOST: z.string(),
    MAIL_PORT: z.string().transform(Number).default(587),
    MAIL_USER: z.string(),
    MAIL_PASS: z.string(),
    MAIL_FROM: z.string().email(),

    CORS_ORIGIN: z.string().optional(),
  })
  .transform((env) => {
    const corsOrigin =
      env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : env.CORS_ORIGIN || env.APP_URL;

    return {
      ...env,
      CORS_ORIGIN: corsOrigin,
    };
  });
