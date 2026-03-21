import { z } from "zod";
import { router } from "../../trpc/init";
import { publicProcedure } from "../../trpc/procedures/public";
import { ListProjectsService } from "../../services/project/List";
import { GetProjectBySlugService } from "../../services/project/Get";
import {
  ProjectWithRelationsSchema,
  ListProjectsOptionsSchema,
} from "@portfolio/shared";
import { executeService } from "../../trpc/executers/base";

export const projectsRouter = router({
  list: publicProcedure
    .input(ListProjectsOptionsSchema)
    .output(z.array(ProjectWithRelationsSchema))
    .query(async ({ ctx, input }) =>
      executeService(ListProjectsService, ctx, input),
    ),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .output(ProjectWithRelationsSchema.nullable())
    .query(async ({ ctx, input }) =>
      executeService(GetProjectBySlugService, ctx, input.slug),
    ),
});
