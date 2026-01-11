import { middleware } from '../init';
import { Metrics } from '../../core/metrics/metrics';

export const metricsMiddleware = middleware(async ({ path, type, next }) => {
  const metrics = Metrics.getInstance();

  const endTimer = metrics.trpcDuration.startTimer();

  try {
    const result = await next();

    endTimer({ procedure: path, type, status: 'success' });

    return result;
  } catch (error) {
    endTimer({ procedure: path, type, status: 'error' });

    throw error;
  }
});
