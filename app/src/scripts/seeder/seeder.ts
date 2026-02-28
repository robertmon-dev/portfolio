import { Logger } from '../../core/logger/logger';
import { Database } from '../../core/database/database';
import { AdminSeed } from './seeds/adminSeed';
import type { Seeding, Growing } from './types';

export class DatabaseSeeder implements Seeding {
  private readonly database: Database;
  private readonly logger: Logger;
  private readonly seeds: Growing[];

  constructor() {
    this.database = Database.getInstance();

    this.logger = new Logger('DatabaseSeeder');
    this.seeds = [
      new AdminSeed(this.database.client, new Logger('AdminSeed')),
    ];
  }

  public async grow(): Promise<void> {
    this.logger.info('Starting the database seeding process...');

    try {
      await this.database.connect();

      for (const seed of this.seeds) {
        await seed.run();
      }

      this.logger.info('All seeds have grown successfully!');
    } catch (error) {
      this.logger.error('Error during the growing process:', error);
      process.exit(1);
    } finally {
      await this.database.disconnect();
    }
  }
}
