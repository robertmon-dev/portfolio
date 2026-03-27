import { z } from "zod";
import { zString } from "./generic";

export const HealthResponseSchema = z.object({
  status: z.enum(["ok", "error"]),
  uptime: z.number(),
  timestamp: zString,
  database: z.object({
    connected: z.boolean(),
    message: zString,
  }),
  redis: z.object({
    connected: z.boolean(),
  }),
});
