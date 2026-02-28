import { z } from 'zod';
import { router } from '../../trpc/init';
import { protectedProcedure } from '../../trpc/procedures/private';
import { CreateExperienceService } from '../../services/experience/Create';
import { UpdateExperienceService } from '../../services/experience/Update';
import { DeleteExperienceService } from '../../services/experience/Delete';
import {
  CreateExperienceSchema,
  UpdateExperienceSchema,
} from '@portfolio/shared';
import { executeService } from '../../trpc/executers/base';

export const experiencePrivateRouter = router({
  create: protectedProcedure
    .input(CreateExperienceSchema)
    .mutation(async ({ ctx, input }) =>
      executeService(CreateExperienceService, ctx, input)
    ),

  update: protectedProcedure
    .input(z.object({
      id: z.string().uuid(),
      data: UpdateExperienceSchema.omit({ id: true })
    }))
    .mutation(async ({ ctx, input }) =>
      executeService(UpdateExperienceService, ctx, input)
    ),

  delete: protectedProcedure
    .input(z.object({
      ids: z.array(z.string().uuid())
    }))
    .mutation(async ({ ctx, input }) =>
      executeService(DeleteExperienceService, ctx, input.ids)
    ),
});
