import { z } from "zod";
import { router } from "../../trpc/init";
import { publicProcedure } from "../../trpc/procedures/public";
import { ListTechStacksService } from "../../services/techStack/List";
import { GetTechStackService } from "../../services/techStack/Get";
import { TechStackWithRelationsSchema } from "@portfolio/shared";
import { executeService } from "../../trpc/executers/base";

export const techStackPublicRouter = router({
  list: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/tech-stack",
        tags: ["TechStack"],
        summary: "List all technologies",
        description:
          "Retrieves a complete list of technologies in the stack, including metadata like icons, categories, and associated projects.",
        protect: false,
      },
    })
    .input(z.void())
    .output(z.array(TechStackWithRelationsSchema))
    .query(async ({ ctx }) =>
      executeService(ListTechStacksService, ctx, undefined),
    ),

  getById: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/tech-stack/{id}",
        tags: ["TechStack"],
        summary: "Get technology by ID",
        description:
          "Fetches detailed information for a single technology item using its unique UUID. Returns null if not found.",
        protect: false,
      },
    })
    .input(z.object({ id: z.string().uuid() }))
    .output(TechStackWithRelationsSchema.nullable())
    .query(async ({ ctx, input }) =>
      executeService(GetTechStackService, ctx, input.id),
    ),
});
