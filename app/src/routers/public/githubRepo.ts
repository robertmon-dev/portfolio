import { router } from '../../trpc/init';
import { publicProcedure } from '../../trpc/procedures/public';
import { ListGithubReposService } from '../../services/github/List';
import { executeService } from '../../trpc/executers/base';

export const githubRepoPublicRouter = router({
  listRepos: publicProcedure
    .query(async ({ ctx }) => executeService(ListGithubReposService, ctx, undefined)),
});
