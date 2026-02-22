import { router } from '../../trpc/init';
import { publicProcedure } from '../../trpc/procedures/public';
import { GithubStatsSchema } from '@portfolio/shared';
import { GetGithubStatsService } from '../../services/github/Get';
import { executeService } from '../../trpc/executers/base';

export const githubStatsPublicRouter = router({
  getStats: publicProcedure
    .output(GithubStatsSchema.nullable())
    .query(async ({ ctx }) => executeService(GetGithubStatsService, ctx, ctx.settings.NICKNAME)),
});
