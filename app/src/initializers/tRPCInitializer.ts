import { Express } from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { TrpcContext } from '../trpc/context/context';
import { Logger } from '../core/logger/logger';
import { appRouter } from '../routers/app';

export class TrpcInitializer {
  private logger: Logger;
  private trpcContext: TrpcContext;

  constructor() {
    this.logger = new Logger('TrpcInitializer');
    this.trpcContext = new TrpcContext();
  }

  public setup(app: Express): void {
    this.logger.info('Initializing tRPC layer...');

    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext: this.trpcContext.create,
        onError: ({ path, error }) => {
          this.logger.error(`tRPC failed on '${path ?? '<no-path>'}'`, error);
        },
      })
    );

    this.logger.info('tRPC middleware mounted at /trpc');
  }
}
