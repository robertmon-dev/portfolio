import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { Logger } from '../logger/logger';
import { Settings } from '../settings/settings';

export class Database {
  private static instance: Database;
  public readonly client: PrismaClient;
  private logger: Logger;

  private constructor() {
    this.logger = new Logger('Database');
    const settings = Settings.getInstance().config;
    const isDev = settings.NODE_ENV === 'development';

    const pool = new pg.Pool({ connectionString: settings.DATABASE_URL });

    const adapter = new PrismaPg(pool);

    this.client = new PrismaClient({
      adapter,
      log: isDev ? ['query', 'error', 'warn'] : ['error'],
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  public async connect(): Promise<void> {
    try {
      await this.client.$connect();
      this.logger.info('Connected to PostgreSQL via Prisma (Adapter-PG)');
    } catch (error) {
      this.logger.error('Failed to connect to database', error);
      process.exit(1);
    }
  }

  public async disconnect(): Promise<void> {
    await this.client.$disconnect();
    this.logger.info('Disconnected from database');
  }
}
