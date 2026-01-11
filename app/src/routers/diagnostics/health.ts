import { router } from '../../trpc/init';
import { publicProcedure } from '../../trpc/procedures/public';
import { HealthResponseSchema } from '@portfolio/shared';


export const healthRouter = router({
  check: publicProcedure
    .output(HealthResponseSchema)
    .query(async ({ ctx }) => {
      let dbConnected = false;
      let dbMessage = 'Connected';

      try {
        await ctx.db.$queryRaw`SELECT 1`;
        dbConnected = true;
      } catch (error) {
        dbMessage = error instanceof Error ? error.message : 'Unknown database error';
      }

      return {
        status: dbConnected ? 'ok' : 'error',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        database: {
          connected: dbConnected,
          message: dbMessage,
        },
      };
    }),
});
