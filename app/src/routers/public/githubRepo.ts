import { z } from 'zod';
import { router } from '../../trpc/init';
import { publicProcedure } from '../../trpc/procedures/public';
import { ListGithubReposService } from '../../services/github/List';
import { executeService } from '../../trpc/executers/base';
import { GithubRepoSchema } from '@portfolio/shared';

export const githubRepoPublicRouter = router({
  listRepos: publicProcedure
    .output(z.array(GithubRepoSchema))
    .query(async ({ ctx }) => executeService(ListGithubReposService, ctx, undefined)),
});
