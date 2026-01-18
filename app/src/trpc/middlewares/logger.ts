import { middleware } from '../init';
import { Logger } from '../../core/logger/logger';

const logger = new Logger('tRPC');

export const loggerMiddleware = middleware(async ({ path, type, next }) => {
  const start = Date.now();

  try {
    const result = await next();

    const duration = Date.now() - start;
    logger.info(`Completed ${type} '${path}'`, { duration: `${duration}ms` });

    return result;
  } catch (error) {
    const duration = Date.now() - start;
    logger.error(`Failed ${type} '${path}'`, error, { duration: `${duration}ms` });

    throw error;
  }
});
