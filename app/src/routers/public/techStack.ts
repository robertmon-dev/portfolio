import { z } from 'zod';
import { router } from '../../trpc/init';
import { publicProcedure } from '../../trpc/procedures/public';
import { ListTechStacksService } from "../../services/techStack/List";
import { GetTechStackService } from "../../services/techStack/Get";
import { TechStackWithRelationsSchema } from '@portfolio/shared';
import { executeService } from '../../trpc/executers/base';

export const techStackPublicRouter = router({
  list: publicProcedure
    .output(z.array(TechStackWithRelationsSchema))
    .query(async ({ ctx }) => executeService(ListTechStacksService, ctx, undefined)),

  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .output(TechStackWithRelationsSchema.nullable())
    .query(async ({ ctx, input }) => executeService(GetTechStackService, ctx, input.id)),
});
