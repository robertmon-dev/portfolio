import { z } from 'zod';
import { router } from '../../trpc/init';
import { publicProcedure } from '../../trpc/procedures/public';
import { ListExperienceService } from "../../services/experience/List";
import { GetExperienceService } from "../../services/experience/Get";
import { ExperienceSchema } from '@portfolio/shared';
import { executeService } from '../../trpc/executers/base';

export const experiencePublicRouter = router({
  list: publicProcedure
    .output(z.array(ExperienceSchema))
    .query(async ({ ctx }) =>
      executeService(ListExperienceService, ctx, undefined)
    ),

  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .output(ExperienceSchema.nullable())
    .query(async ({ ctx, input }) =>
      executeService(GetExperienceService, ctx, input.id)
    ),
});
