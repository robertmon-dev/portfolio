import { z } from 'zod';
import { router } from '../../trpc/init';
import { protectedProcedure } from '../../trpc/procedures/private';
import { CreateProjectService } from '../../services/project/Create';
import { UpdateProjectService } from '../../services/project/Update';
import { DeleteProjectService } from '../../services/project/Delete';
import {
  CreateProjectSchema,
  UpdateProjectSchema
} from '@portfolio/shared';

export const projectPrivateRouter = router({
  create: protectedProcedure
    .input(CreateProjectSchema)
    .mutation(async ({ ctx, input }) => {
      const service = new CreateProjectService(
        ctx.db,
        ctx.cache,
        ctx.logger,
        ctx.settings
      );

      return service.execute(input);
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string().uuid(),
      data: UpdateProjectSchema
    }))
    .mutation(async ({ ctx, input }) => {
      const service = new UpdateProjectService(
        ctx.db,
        ctx.cache,
        ctx.logger,
        ctx.settings
      );

      return service.execute(input.id, input.data);
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const service = new DeleteProjectService(
        ctx.db,
        ctx.cache,
        ctx.logger,
        ctx.settings
      );

      return service.execute(input.id);
    }),
});
