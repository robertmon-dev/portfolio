import { z } from "zod";
import { zEmail, zUuid, zUrl, zString } from "@portfolio/shared";

export const envSchema = z
  .object({
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),

    PORT: z.coerce.number().default(8800),

    DATABASE_URL: zUrl,
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

    JWT_SECRET: zString.min(32, "Security: JWT_SECRET is too short"),
    NICKNAME: zString,

    ROOT_EMAIL: zEmail,
    ROOT_PASSWORD: z.string().min(8).default("admin1234"),
    ROOT_USERNAME: zString.default("root"),

    LOG_LEVEL: z
      .enum(["fatal", "error", "warn", "info", "debug", "trace"])
      .default("info"),

    APP_URL: zUrl.default("http://localhost:8800"),

    GITHUB_TOKEN: z.string().min(1),

    MAIL_HOST: zString,
    MAIL_PORT: z.coerce.number().default(587),
    MAIL_USER: zString,
    MAIL_PASS: z.string(),
    MAIL_FROM: zEmail,

    X_API_TOKEN: zUuid.optional(),
    CORS_ORIGIN: z.string().optional(),
  })
  .transform((env) => ({
    ...env,
    CORS_ORIGIN:
      env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : env.CORS_ORIGIN || env.APP_URL,
  }));
