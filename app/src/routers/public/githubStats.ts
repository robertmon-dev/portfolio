import { router } from '../../trpc/init';
import { publicProcedure } from '../../trpc/procedures/public';
import { GithubStatsSchema } from '@portfolio/shared';
import { GetGithubStatsService } from '../../services/github/Get';


export const githubStatsPublicRouter = router({
  getStats: publicProcedure
    .output(GithubStatsSchema.nullable())
    .query(async () => {
      return await new GetGithubStatsService().execute();
    }),


});
