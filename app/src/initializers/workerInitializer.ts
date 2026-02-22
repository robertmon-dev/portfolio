import { Logger } from '../core/logger/logger';
import { MailQueueWorker } from '../services/mail/mailQueueWorker';

export class WorkerInitializer {
  private logger: Logger;
  private mailWorker: MailQueueWorker | null = null;

  constructor() {
    this.logger = new Logger('WorkerInitializer');
  }

  public init(): void {
    this.logger.info('Starting BullMQ workers...');
    this.mailWorker = new MailQueueWorker();

    this.logger.info('MailQueueWorker is online and listening.');
  }

  public async stop(): Promise<void> {
    this.logger.info('Stopping BullMQ workers...');
    if (this.mailWorker) {
      await this.mailWorker.close();
    }
  }
}
