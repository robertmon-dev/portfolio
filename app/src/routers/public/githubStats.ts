import { router } from '../../trpc/init';
import { publicProcedure } from '../../trpc/procedures/public';
import { GithubStatsSchema } from '@portfolio/shared';
import { GetGithubStatsService } from '../../services/github/Get';

export const githubStatsPublicRouter = router({
  getStats: publicProcedure
    .output(GithubStatsSchema.nullable())
    .query(async ({ ctx }) => {
      const service = new GetGithubStatsService(
        ctx.db,
        ctx.cache,
        ctx.logger,
        ctx.settings
      );

      return await service.execute(ctx.settings.NICKNAME);
    }),
});
