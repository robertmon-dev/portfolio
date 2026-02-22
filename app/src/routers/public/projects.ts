import { z } from 'zod';
import { router } from '../../trpc/init';
import { publicProcedure } from '../../trpc/procedures/public';
import { CacheStore } from '../../infrastructure/cache/cacheStore';
import { ListProjectsService } from "../../services/project/List";
import { GetProjectBySlugService } from "../../services/project/Get";
import { ProjectWithRelationsSchema, ListProjectsOptionsSchema } from '@portfolio/shared';

export const projectsRouter = router({
  list: publicProcedure
    .input(ListProjectsOptionsSchema)
    .output(z.array(ProjectWithRelationsSchema))
    .query(async ({ ctx, input }) => {
      const cache = CacheStore.getInstance();
      const service = new ListProjectsService(ctx.db, cache, ctx.logger, ctx.settings);

      return await service.execute(input);
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .output(ProjectWithRelationsSchema.nullable())
    .query(async ({ ctx, input }) => {
      const cache = CacheStore.getInstance();
      const service = new GetProjectBySlugService(ctx.db, cache, ctx.logger, ctx.settings);

      return await service.execute(input.slug);
    }),
});
