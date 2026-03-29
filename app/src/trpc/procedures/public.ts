import { instance } from "../init";
import { loggerMiddleware } from "../middlewares/logger";
import { metricsMiddleware } from "../middlewares/metrics";
import { rateLimitMiddleware } from "../middlewares/rateLimit";

export const publicProcedure = instance.procedure
  .use(rateLimitMiddleware)
  .use(loggerMiddleware)
  .use(metricsMiddleware);
