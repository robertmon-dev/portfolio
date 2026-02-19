import { middleware } from '../../init';
import { CacheStore } from '../../../infrastructure/cache/cacheStore';
import { crypto } from 'crypto';

interface CacheOptions {
  ttl?: number;
  isPrivate?: boolean;
}

export const cacheable = (options: CacheOptions = {}) =>
  middleware(async ({ ctx, path, input, next }) => {
    const { ttl = 300, isPrivate = false } = options;
    const cache = CacheStore.getInstance();

    const inputHash = crypto
      .createHash('md5')
      .update(JSON.stringify(input) || '')
      .digest('hex');

    let cacheKey = `trpc-cache:${path}:${inputHash}`;
    if (isPrivate && ctx.user) {
      cacheKey += `:${ctx.user.id}`;
    }

    const cachedData = await cache.get(cacheKey);
    if (cachedData) {
      ctx.logger.debug(`Cache hit for ${path}`, { cacheKey });
      return {
        marker: 'from-cache',
        ok: true,
        data: cachedData,
      } as any;
    }

    const result = await next();

    if (result.ok) {
      await cache.set(cacheKey, result.data, ttl);
      ctx.logger.debug(`Cache stored for ${path}`, { cacheKey, ttl });
    }

    return result;
  });

