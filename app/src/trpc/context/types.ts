import * as trpcExpress from '@trpc/server/adapters/express';
import { Database } from '../../core/database/database';
import { Settings } from '../../core/settings/settings';

export interface Context {
  db: Database['client'];
  settings: Settings['config'];
  req: trpcExpress.CreateExpressContextOptions['req'];
  res: trpcExpress.CreateExpressContextOptions['res'];
}
