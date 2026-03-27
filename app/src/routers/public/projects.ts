import { z } from "zod";
import { router } from "../../trpc/init";
import { publicProcedure } from "../../trpc/procedures/public";
import { ListProjectsService } from "../../services/project/List";
import { GetProjectBySlugService } from "../../services/project/Get";
import {
  ProjectWithRelationsSchema,
  ListProjectsOptionsSchema,
  zString,
} from "@portfolio/shared";
import { executeService } from "../../trpc/executers/base";

export const projectsRouter = router({
  list: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/projects",
        tags: ["Projects"],
        summary: "List portfolio projects",
        description:
          "Retrieves a list of showcase projects including their associated technologies, categories, and media. Supports filtering and pagination via query parameters.",
        protect: false,
      },
    })
    .input(ListProjectsOptionsSchema)
    .output(z.array(ProjectWithRelationsSchema))
    .query(async ({ ctx, input }) =>
      executeService(ListProjectsService, ctx, input),
    ),

  getBySlug: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/projects/{slug}",
        tags: ["Projects"],
        summary: "Get project by slug",
        description:
          "Fetches full details for a specific project using its unique URL-friendly slug. Returns null if the project is not found.",
        protect: false,
      },
    })
    .input(z.object({ slug: zString }))
    .output(ProjectWithRelationsSchema.nullable())
    .query(async ({ ctx, input }) =>
      executeService(GetProjectBySlugService, ctx, input.slug),
    ),
});
