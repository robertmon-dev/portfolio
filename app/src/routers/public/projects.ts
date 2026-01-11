import { z } from 'zod';
import { router } from '../../trpc/init';
import { publicProcedure } from '../../trpc/procedures/public';
import { ProjectService } from '../../services/project/ProjectService';
import { ProjectWithRelationsSchema } from '@portfolio/shared';

const projectService = ProjectService.getInstance();

export const projectsRouter = router({
  list: publicProcedure
    .output(z.array(ProjectWithRelationsSchema))
    .query(async () => {
      return await projectService.getAllVisible();
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .output(ProjectWithRelationsSchema.nullable())
    .query(async ({ input }) => {
      return await projectService.getBySlug(input.slug);
    }),
});
