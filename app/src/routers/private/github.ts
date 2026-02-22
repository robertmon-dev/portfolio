import { z } from 'zod';
import {
  UpdateGithubRepoInputSchema,
  LinkRepoProjectInputSchema
} from '@portfolio/shared';
import { router } from '../../trpc/init';
import { protectedProcedure } from '../../trpc/procedures/private';
import { DeleteGithubRepoService } from '../../services/github/Delete';
import { LinkRepoProjectService } from '../../services/github/Link';
import { UpdateGithubRepoService } from '../../services/github/Update';
import { executeService } from '../../trpc/executers/base';

export const githubPrivateRouter = router({
  update: protectedProcedure
    .input(z.object({
      id: z.string().uuid(),
      data: UpdateGithubRepoInputSchema
    }))
    .mutation(async ({ ctx, input }) => executeService(UpdateGithubRepoService, ctx, input)),

  linkProject: protectedProcedure
    .input(LinkRepoProjectInputSchema)
    .mutation(async ({ ctx, input }) => executeService(LinkRepoProjectService, ctx, input)),

  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      await executeService(DeleteGithubRepoService, ctx, input.id);
      return { success: true };
    }),
});
