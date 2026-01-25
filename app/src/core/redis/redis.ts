import { Redis, type RedisOptions as IoRedisOptions } from 'ioredis';
import type { RedisOptions } from './types';
import { Settings } from '../settings/settings';
import { Logger } from '../logger/logger';
import fs from 'fs';

export class RedisClient {
  public static instance: RedisClient;
  private settings: Settings;
  public client: Redis;
  private logger: Logger;

  private constructor() {
    this.settings = Settings.getInstance();
    this.logger = new Logger('Redis');

    const options: RedisOptions = {
      url: this.settings.config.REDIS_URL,
      tlsEnabled: this.settings.config.REDIS_TLS_ENABLED,
      maxRetries: 3,
      tlsOptions: {
        rejectUnauthorized: this.settings.config.NODE_ENV === 'production',
        ca: this.settings.config.REDIS_CA_PATH
          ? [fs.readFileSync(this.settings.config.REDIS_CA_PATH)]
          : undefined,
      }
    };

    const ioRedisConfig: IoRedisOptions = {
      maxRetriesPerRequest: options.maxRetries,
      connectTimeout: options.connectTimeout ?? 10000,
      tls: options.tlsEnabled ? options.tlsOptions : undefined,
    };

    this.client = new Redis(options.url, ioRedisConfig);
    this.setupEvents();
  }

  private setupEvents() {
    this.client.on('connect', () => {
      this.logger.info('Connection established to Redis server');
    });

    this.client.on('error', (err) => {
      this.logger.error('Redis client connection error', err);
    });

    this.client.on('ready', () => {
      this.logger.info('Redis is ready to accept commands');
    });
  }

  public static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }
    return RedisClient.instance;
  }
}
