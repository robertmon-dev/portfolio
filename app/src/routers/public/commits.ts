import { z } from "zod";
import { router } from "../../trpc/init";
import { publicProcedure } from "../../trpc/procedures/public";
import { GetCommitService } from "src/services/commits/Get";
import { ListCommitsService } from "src/services/commits/List";
import { GithubCommitSchema, zUuid } from "@portfolio/shared";
import { executeService } from "../../trpc/executers/base";

export const githubCommitPublicRouter = router({
  list: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/experience",
        tags: ["Experience"],
        summary: "List all professional commits",
        description:
          "Fetches all github commits records for the public portfolio view.",
        protect: false,
      },
    })
    .input(z.void())
    .output(z.array(GithubCommitSchema))
    .query(async ({ ctx }) =>
      executeService(ListCommitsService, ctx, undefined),
    ),

  getById: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/experience/{id}",
        tags: ["Experience"],
        summary: "Get github commit details",
        description: "Fetches a single github commit record by its UUID.",
        protect: false,
      },
    })
    .input(z.object({ id: zUuid }))
    .output(GithubCommitSchema.nullable())
    .query(async ({ ctx, input }) =>
      executeService(GetCommitService, ctx, input.id),
    ),
});
