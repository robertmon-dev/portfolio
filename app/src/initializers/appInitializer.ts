import express, { Express } from 'express';
import { Server } from 'http';
import { Settings } from '../core/settings/settings';
import { Database } from '../core/database/database';
import { Logger } from '../core/logger/logger';
import { Metrics } from '../core/metrics/metrics';
import { TrpcInitializer } from './tRPCInitializer';
import { SchedulerInitializer } from './schedulerInitializer';

export class AppInitializer {
  private app: Express;
  private server: Server | null = null;
  private settings: Settings;
  private database: Database;
  private logger: Logger;
  private metrics: Metrics;
  private trpcInitializer: TrpcInitializer;
  private schedulerInitializer: SchedulerInitializer;

  public constructor() {
    this.logger = new Logger('System');
    this.settings = Settings.getInstance();
    this.database = Database.getInstance();
    this.metrics = Metrics.getInstance();
    this.trpcInitializer = new TrpcInitializer();
    this.schedulerInitializer = new SchedulerInitializer();
    this.app = express();
  }

  public async bootstrap(): Promise<void> {
    this.logger.info('Bootstrapping application!');

    await this.database.connect();

    this.app.use(express.json());
    this.trpcInitializer.setup(this.app);
    this.schedulerInitializer.init();

    const port = this.settings.config.PORT;

    this.server = this.app.listen(port, () => {
      this.logger.info(`Server listening on http://localhost:${port}`);
    });
  }

  public async shutdown(signal: string): Promise<void> {
    this.logger.info(`Received ${signal}. Starting graceful shutdown.`);

    if (this.server) {
      await new Promise<void>((resolve, reject) => {
        this.server?.close((err) => {
          if (err) return reject(err);
          resolve();
        });
      });
      this.logger.info('HTTP server closed.');
    }

    await this.database.disconnect();

    this.logger.info('Graceful shutdown complete. Bye!');
  }
}
