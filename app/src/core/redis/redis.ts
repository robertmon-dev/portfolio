import { Redis, type RedisOptions as IoRedisOptions } from 'ioredis';
import type { RedisOptions } from './types';
import { Settings } from '../settings/settings';
import { Logger } from '../logger/logger';
import { isSystemError } from './utils';
import fs from 'fs';

export class RedisClient {
  public static instance: RedisClient;
  private settings: Settings;
  public client: Redis;
  private logger: Logger;

  private constructor() {
    this.settings = Settings.getInstance();
    this.logger = new Logger('Redis');

    let caCert: Buffer[] | undefined;
    if (this.settings.config.REDIS_CA_PATH) {
      try {
        caCert = [fs.readFileSync(this.settings.config.REDIS_CA_PATH)];
      } catch (error) {
        this.logger.error(`Failed to load Redis CA cert from path: ${this.settings.config.REDIS_CA_PATH}`, error);
        throw error;
      }
    }

    const options: RedisOptions = {
      url: this.settings.config.REDIS_URL,
      tlsEnabled: this.settings.config.REDIS_TLS_ENABLED,
      tlsOptions: {
        rejectUnauthorized: this.settings.config.NODE_ENV === 'production',
        ca: caCert,
      }
    };

    const ioRedisConfig: IoRedisOptions = {
      maxRetriesPerRequest: null,
      enableOfflineQueue: true,
      connectTimeout: 10000,
      tls: options.tlsEnabled ? options.tlsOptions : undefined,

      retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        this.logger.warn(`Redis connection lost. Retrying in ${delay}ms... (Attempt ${times})`);
        return delay;
      },

      reconnectOnError: (err) => {
        const targetError = 'READONLY';
        if (err.message.includes(targetError)) {
          this.logger.warn('Redis read-only error detected. Forcing reconnect.');
          return true;
        }
        return false;
      }
    };

    this.client = new Redis(options.url, ioRedisConfig);
    this.setupEvents();
  }

  private setupEvents() {
    this.client.on('connect', () => {
      this.logger.info('Connection established to Redis server');
    });

    this.client.on('error', (err) => {
      const silentErrors: Array<string> = ['ECONNREFUSED', 'ETIMEDOUT'];

      const shouldSuppress = silentErrors.some(code =>
        err.message.includes(code) ||
        (isSystemError(err) && err.code === code)
      );

      if (shouldSuppress) {
        this.logger.debug('Redis connection error (suppressed, retrying via strategy)', err);
        return;
      }

      this.logger.error('Redis client connection error', err);
    });

    this.client.on('ready', () => {
      this.logger.info('Redis is ready to accept commands');
    });

    this.client.on('close', () => {
      this.logger.warn('Redis connection closed');
    });

    this.client.on('reconnecting', () => {
      this.logger.info('Redis client is reconnecting...');
    });
  }

  public async close(): Promise<void> {
    this.logger.info('Gracefully shutting down Redis connection...');
    try {
      await this.client.quit();
    } catch (error) {
      this.logger.error('Error during Redis graceful shutdown, forcing disconnect', error);
      this.client.disconnect();
    }
  }

  public async healthCheck(): Promise<boolean> {
    try {
      const response = await this.client.ping();
      return response === 'PONG';
    } catch (e) {
      return false;
    }
  }

  public static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }
    return RedisClient.instance;
  }
}
