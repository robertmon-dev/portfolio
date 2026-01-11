import client from 'prom-client';
import { Logger } from '../logger/logger';

export class Metrics {
  private static instance: Metrics;
  private logger: Logger;

  public readonly register: client.Registry;

  public readonly trpcDuration: client.Histogram;
  public readonly dbErrors: client.Counter;

  private constructor() {
    this.logger = new Logger('Metrics');
    this.register = new client.Registry();

    client.collectDefaultMetrics({ register: this.register, prefix: 'portfolio_' });

    this.trpcDuration = new client.Histogram({
      name: 'request_duration_seconds',
      help: 'Duration of tRPC procedures in seconds',
      labelNames: ['procedure', 'type', 'status'],
      buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
    });

    this.dbErrors = new client.Counter({
      name: 'db_errors_total',
      help: 'Total number of database errors',
      labelNames: ['operation', 'model'],
    });

    this.register.registerMetric(this.trpcDuration);
    this.register.registerMetric(this.dbErrors);

    this.logger.info('Metrics initialized');
  }

  public static getInstance(): Metrics {
    if (!Metrics.instance) {
      Metrics.instance = new Metrics();
    }

    return Metrics.instance;
  }
}
