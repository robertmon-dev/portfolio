import { PrismaClient } from '@prisma/client';
import type { Logging } from '../core/logger/types';
import type { Caching } from '../infrastructure/cache/types';
import type { Settings } from '../core/settings/settings';

export abstract class BaseService {
  constructor(
    protected readonly db: PrismaClient,
    protected readonly cache: Caching,
    protected readonly logger: Logging,
    protected readonly settings: Settings['config']
  ) { }
}
