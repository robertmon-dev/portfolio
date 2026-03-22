import { z } from "zod";
import { router } from "../../trpc/init";
import { publicProcedure } from "../../trpc/procedures/public";
import { ListExperienceService } from "../../services/experience/List";
import { GetExperienceService } from "../../services/experience/Get";
import { ExperienceSchema } from "@portfolio/shared";
import { executeService } from "../../trpc/executers/base";

export const experiencePublicRouter = router({
  list: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/experience",
        tags: ["Experience"],
        summary: "List all professional experiences",
        description:
          "Fetches all experience records for the public portfolio view.",
        protect: false,
      },
    })
    .input(z.void())
    .output(z.array(ExperienceSchema))
    .query(async ({ ctx }) =>
      executeService(ListExperienceService, ctx, undefined),
    ),

  getById: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/experience/{id}",
        tags: ["Experience"],
        summary: "Get experience details",
        description: "Fetches a single experience record by its UUID.",
        protect: false,
      },
    })
    .input(z.object({ id: z.uuid() }))
    .output(ExperienceSchema.nullable())
    .query(async ({ ctx, input }) =>
      executeService(GetExperienceService, ctx, input.id),
    ),
});
