import { BaseService } from '../service';
import { HealthChecking } from './types';
import { HealtCheckReponse } from '@portfolio/shared';

export class HealthService extends BaseService implements HealthChecking {
  public async execute(): Promise<HealtCheckReponse> {
    let dbConnected = false;
    let dbMessage = 'Connected';
    let redisConnected = false;

    try {
      await this.db.$queryRaw`SELECT 1`;
      dbConnected = true;
    } catch (error) {
      this.logger.error('Health check: Database connection failed', error);
      dbMessage = error instanceof Error ? error.message : 'Unknown database error';
    }

    try {
      await this.cache.get('health-check-ping');
      redisConnected = true;
    } catch (error) {
      this.logger.error('Health check: Redis connection failed', error);
      redisConnected = false;
    }

    return {
      status: (dbConnected && redisConnected) ? 'ok' : 'error',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: {
        connected: dbConnected,
        message: dbMessage,
      },
      redis: {
        connected: redisConnected,
      },
    };
  }
}
