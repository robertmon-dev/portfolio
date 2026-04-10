import { instance } from "../init";
import { loggerMiddleware } from "../middlewares/logger";
import { metricsMiddleware } from "../middlewares/metrics";
import { strictRateLimitMiddleware } from "../middlewares/rateLimit";

export const strictPublicProcedure = instance.procedure
  .use(strictRateLimitMiddleware)
  .use(loggerMiddleware)
  .use(metricsMiddleware);
