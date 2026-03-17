import { Logger } from '../core/logger/logger';
import { MailQueueWorker } from '../services/mail/mailQueueWorker';
import { PrismaClient } from '@prisma/client';
import { Caching } from '../infrastructure/cache/types';
import { Settings } from '../core/settings/settings';

export class WorkerInitializer {
  private logger: Logger;
  private mailWorker: MailQueueWorker | null = null;

  constructor(
    private readonly db: PrismaClient,
    private readonly cache: Caching,
    private readonly settings: Settings['config']
  ) {
    this.logger = new Logger('WorkerInitializer');
  }

  public init(): void {
    this.logger.info('Starting BullMQ workers...');
    this.mailWorker = new MailQueueWorker(this.db, this.cache, this.settings);

    this.logger.info('MailQueueWorker is online and listening.');
  }

  public async stop(): Promise<void> {
    if (this.mailWorker) {
      await this.mailWorker.close();
    }
  }
}
