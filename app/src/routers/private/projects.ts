import { z } from "zod";
import { router } from "../../trpc/init";
import { protectedProcedure } from "../../trpc/procedures/private";
import { CreateProjectService } from "../../services/project/Create";
import { UpdateProjectService } from "../../services/project/Update";
import { DeleteProjectService } from "../../services/project/Delete";
import { CreateProjectSchema, UpdateProjectSchema } from "@portfolio/shared";
import { executeService } from "../../trpc/executers/base";

export const projectPrivateRouter = router({
  create: protectedProcedure
    .input(CreateProjectSchema)
    .mutation(async ({ ctx, input }) =>
      executeService(CreateProjectService, ctx, input),
    ),

  update: protectedProcedure
    .input(UpdateProjectSchema)
    .mutation(async ({ ctx, input }) =>
      executeService(UpdateProjectService, ctx, input),
    ),

  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) =>
      executeService(DeleteProjectService, ctx, input.id),
    ),
});
