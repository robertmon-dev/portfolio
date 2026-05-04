import { PrismaClient } from '@prisma/client';
import type { Logging } from '../../core/logger/types';
import type { Caching } from '../../infrastructure/cache/types';
import type { Settings } from '../../core/settings/settings';
import type { Context } from '../../trpc/context/types';


export interface ServiceDependencies {
  db: PrismaClient;
  cache: Caching;
  logger: Logging;
  settings: Settings['config'];
}

export type BaseServiceConstructor<TService> = new (
  db: Context['db'],
  cache: Context['cache'],
  logger: Context['logger'],
  settings: Context['settings']
) => TService;
