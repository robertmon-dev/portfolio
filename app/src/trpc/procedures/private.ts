import { TrpcContext } from '../context/context';
import { AuthorizedContext } from '../context/types';
import { publicProcedure } from './public';

export const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const authorizedCtx: AuthorizedContext = await TrpcContext.authorizeContext(ctx);

  return next({
    ctx: authorizedCtx
  });
});
