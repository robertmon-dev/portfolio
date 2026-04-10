import { z } from "zod";
import { router } from "../../trpc/init";
import { publicProcedure } from "../../trpc/procedures/public";
import { GetCommitService } from "src/services/commits/Get";
import { ListCommitsService } from "src/services/commits/List";
import {
  GithubCommitSchema,
  ListCommitsInputSchema,
  ListCommitsOutputSchema,
  zUuid,
} from "@portfolio/shared";
import { executeService } from "../../trpc/executers/base";

export const githubCommitPublicRouter = router({
  list: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/github/commit",
        tags: ["GithubCommit"],
        summary: "List all professional commits",
        description:
          "Fetches all github commits records for the public portfolio view.",
        protect: false,
      },
    })
    .input(ListCommitsInputSchema)
    .output(ListCommitsOutputSchema)
    .query(async ({ ctx, input }) =>
      executeService(ListCommitsService, ctx, input),
    ),

  getById: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/github/commit/{id}",
        tags: ["GithubCommit"],
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
