import * as trpcExpress from '@trpc/server/adapters/express';
import { Database } from '../../core/database/database';
import { Settings } from '../../core/settings/settings';
import type { Logger } from '../../core/logger/logger';
import type { Permission } from '../permission/permission';
import type { User } from '@prisma/client';

export interface Context {
  db: Database['client'];
  settings: Settings['config'];
  req: trpcExpress.CreateExpressContextOptions['req'];
  res: trpcExpress.CreateExpressContextOptions['res'];
  logger: Logger;
  permissions: Permission | null;
}

export interface AuthorizedContext extends Context {
  user: User;
}
