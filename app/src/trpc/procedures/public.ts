import { instance } from '../init';
import { loggerMiddleware } from '../middlewares/logger';
import { metricsMiddleware } from '../middlewares/metrics';

export const publicProcedure = instance.procedure
  .use(loggerMiddleware)
  .use(metricsMiddleware);

