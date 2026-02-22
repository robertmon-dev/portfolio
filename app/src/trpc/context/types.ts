import * as trpcExpress from '@trpc/server/adapters/express';
import type { User } from '@prisma/client';
import type { Settings } from '../../core/settings/settings';
import type { Permission } from '../permission/permission';
import type { Persisting } from '../../core/database/types';
import type { Caching } from '../../infrastructure/cache/types';
import type { Logging } from '../../core/logger/types';

export interface Context {
  db: Persisting['client'];
  cache: Caching;
  logger: Logging;

  settings: Settings['config'];
  req: trpcExpress.CreateExpressContextOptions['req'];
  res: trpcExpress.CreateExpressContextOptions['res'];
  permissions: Permission | null;
}

export interface AuthorizedContext extends Context {
  user: User;
  permissions: Permission;
}
