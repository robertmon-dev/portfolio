import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import { Logger } from '../core/logger/logger';
import { GithubFetchWorker } from '../services/github/workers/Fetch';
import type { Caching } from '../infrastructure/cache/types';
import type { Settings } from '../core/settings/settings';

export class SchedulerInitializer {
  private logger: Logger;
  private githubWorker: GithubFetchWorker;
  private scheduledTasks: cron.ScheduledTask[] = [];

  constructor(
    db: PrismaClient,
    cache: Caching,
    settings: Settings['config']
  ) {
    this.logger = new Logger('Scheduler');

    this.githubWorker = new GithubFetchWorker(
      db,
      cache,
      new Logger('GithubWorker'),
      settings
    );
  }

  public init(): void {
    this.logger.info('Initializing background jobs...');

    const task = cron.schedule('*/15 * * * *', async () => {
      await this.githubWorker.run();
    });
    this.scheduledTasks.push(task);

    (async () => {
      try {
        this.logger.info('Running initial GitHub sync...');
        await this.githubWorker.run();
      } catch (err) {
        this.logger.error('Initial GitHub sync failed', err);
      }
    })();

    this.logger.info('Scheduler started (GitHub sync: every 15m)');
  }

  public stop(): void {
    this.scheduledTasks.forEach(task => task.stop());
  }
}
