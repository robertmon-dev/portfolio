import * as trpcExpress from '@trpc/server/adapters/express';
import { Database } from '../../core/database/database';
import { Settings } from '../../core/settings/settings';
import { Logger } from '../../core/logger/logger';
import type { Context } from './types';

export class TrpcContext {
  private db: Database;
  private settings: Settings;
  private logger: Logger;

  public constructor() {
    this.db = Database.getInstance();
    this.settings = Settings.getInstance();
    this.logger = new Logger('request')
  }

  public createContext = ({
    req,
    res,
  }: trpcExpress.CreateExpressContextOptions): Context => {
    return {
      db: this.db.client,
      settings: this.settings.config,
      req,
      res,
    };
  };
}
