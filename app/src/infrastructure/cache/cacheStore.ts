import { RedisClient } from '../../core/redis/redis';
import { Logger } from '../../core/logger/logger';
import type { Caching } from './types';

export class CacheStore implements Caching {
  private redis = RedisClient.getInstance().client;
  private logger = new Logger('CacheStore');
  private static instance: CacheStore;

  private constructor() { }

  public static getInstance(): CacheStore {
    if (!CacheStore.instance) {
      CacheStore.instance = new CacheStore();
    }

    return CacheStore.instance;
  }

  public async set<T>(key: string, value: T, ttlSeconds: number = 3600): Promise<void> {
    try {
      const data = JSON.stringify(value);
      await this.redis.set(key, data, 'EX', ttlSeconds);
    } catch (err) {
      this.logger.error(`Failed to set cache for key: ${key}`, err);
    }
  }

  public async get<T>(key: string): Promise<T | null> {
    try {
      const data = await this.redis.get(key);
      return data ? (JSON.parse(data) as T) : null;
    } catch (err) {
      this.logger.error(`Failed to get cache for key: ${key}`, err);
      return null;
    }
  }

  public async del(key: string): Promise<void> {
  try {
    if (key.includes('*')) {
      this.logger.debug(`Deleting keys by pattern: ${key}`);

      const stream = this.redis.scanStream({
        match: key,
        count: 100,
      });

      stream.on('data', async (keys: string[]) => {
        if (keys.length > 0) {
          await this.redis.del(...keys);
        }
      });

      return new Promise((resolve, reject) => {
        stream.on('end', resolve);
        stream.on('error', reject);
      });
    }

    await this.redis.del(key);
  } catch (err) {
    this.logger.error(`Failed to delete cache for key/pattern: ${key}`, err);
  }
}

  public async wrap<T>(
    key: string,
    ttl: number,
    fetcher: () => Promise<T>
  ): Promise<T> {
    const cached = await this.get(key);
    if (cached) return cached as T;

    const fresh = await fetcher();
    await this.set(key, fresh, ttl);
    return fresh;
  }
}
