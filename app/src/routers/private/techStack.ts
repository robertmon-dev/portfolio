import { z } from 'zod';
import { router } from '../../trpc/init';
import { protectedProcedure } from '../../trpc/procedures/private';
import { CreateTechStackService } from '../../services/techStack/Create';
import { UpdateTechStackService } from '../../services/techStack/Update';
import { DeleteTechStackService } from '../../services/techStack/Delete';
import { LinkTechStackProjectService } from '../../services/techStack/Link';
import {
  CreateTechStackSchema,
  UpdateTechStackSchema,
  LinkTechStackProjectSchema
} from '@portfolio/shared';
import { executeService } from '../../trpc/executers/base';

export const techStackPrivateRouter = router({
  create: protectedProcedure
    .input(CreateTechStackSchema)
    .mutation(async ({ ctx, input }) => executeService(CreateTechStackService, ctx, input)),

  update: protectedProcedure
    .input(z.object({
      id: z.string().uuid(),
      data: UpdateTechStackSchema.omit({ id: true })
    }))
    .mutation(async ({ ctx, input }) => executeService(UpdateTechStackService, ctx, input)),

  delete: protectedProcedure
    .input(z.object({
      ids: z.array(z.string().uuid())
    }))
    .mutation(async ({ ctx, input }) => executeService(DeleteTechStackService, ctx, input.ids)),

  linkProject: protectedProcedure
    .input(LinkTechStackProjectSchema)
    .mutation(async ({ ctx, input }) => executeService(LinkTechStackProjectService, ctx, input)),
});
