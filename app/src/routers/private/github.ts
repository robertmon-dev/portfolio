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

export const githubAdminRouter = router({
  update: protectedProcedure
    .input(z.object({
      id: z.string().uuid(),
      data: UpdateGithubRepoInputSchema
    }))
    .mutation(async ({ ctx, input }) => {
      const service = new UpdateGithubRepoService(
        ctx.db, ctx.cache, ctx.logger, ctx.settings
      );
      return await service.execute(input.id, input.data);
    }),

  linkProject: protectedProcedure
    .input(LinkRepoProjectInputSchema)
    .mutation(async ({ ctx, input }) => {
      const service = new LinkRepoProjectService(
        ctx.db, ctx.cache, ctx.logger, ctx.settings
      );
      return await service.execute(input.repoId, input.projectId);
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const service = new DeleteGithubRepoService(
        ctx.db, ctx.cache, ctx.logger, ctx.settings
      );
      await service.execute(input.id);
      return { success: true };
    }),
});
