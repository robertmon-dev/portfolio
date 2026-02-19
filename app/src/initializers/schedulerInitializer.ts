import cron from 'node-cron';
import { Logger } from '../core/logger/logger';
import { GithubFetchService } from '../services/github/Fetch';

export class SchedulerInitializer {
  private logger: Logger;
  private githubService: GithubFetchService;

  constructor() {
    this.logger = new Logger('Scheduler');
    this.githubService = GithubFetchService.getInstance();
  }

  public init(): void {
    this.logger.info('Initializing background jobs');

    cron.schedule('*/15 * * * *', () => {
      this.githubService.syncStats();
    });

    this.githubService.syncStats();

    this.logger.info('Scheduler started (Github sync: every 15m)');
  }
}
