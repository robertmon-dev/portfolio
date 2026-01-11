import { router } from '../../trpc/init';
import { publicProcedure } from '../../trpc/procedures/public';
import { GithubService } from '../../services/github/GithubService';
import { GithubStatsSchema } from '@portfolio/shared';

const githubService = GithubService.getInstance();

export const githubRouter = router({
  getStats: publicProcedure
    .output(GithubStatsSchema.nullable())
    .query(async () => {
      return await githubService.getStats();
    }),
});
