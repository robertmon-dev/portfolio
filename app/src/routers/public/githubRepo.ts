import { router } from '../../trpc/init';
import { publicProcedure } from '../../trpc/procedures/public';
import { ListGithubReposService } from '../../services/github/List';

export const githubRepoPublicRouter = router({
  listRepos: publicProcedure
    .query(async ({ ctx }) => {
      const service = new ListGithubReposService(
        ctx.db,
        ctx.cache,
        ctx.logger,
        ctx.settings
      );

      return await service.execute();
    }),
});
