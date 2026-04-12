import { z } from "zod";
import { envSchema, baseEnvSchema } from "./schemas";

export type EnvInput = z.input<typeof baseEnvSchema>;
export type EnvConfig = z.output<typeof envSchema>;
