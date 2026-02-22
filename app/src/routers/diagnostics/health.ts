import { router } from '../../trpc/init';
import { publicProcedure } from '../../trpc/procedures/public';
import { HealthResponseSchema } from '@portfolio/shared';
import { HealthService } from '../../services/health/health';


export const healthRouter = router({
  check: publicProcedure
    .output(HealthResponseSchema)
    .query(async ({ ctx }) => {
      const health = new HealthService(
        ctx.db,
        ctx.cache,
        ctx.logger,
        ctx.settings
      )
      return health.execute();
    }),
});
