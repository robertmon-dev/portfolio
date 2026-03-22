import { z } from "zod";
import { router } from "../../trpc/init";
import { publicProcedure } from "../../trpc/procedures/public";
import { GithubStatsSchema } from "@portfolio/shared";
import { GetGithubStatsService } from "../../services/github/Get";
import { executeService } from "../../trpc/executers/base";

export const githubStatsPublicRouter = router({
  getStats: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/github/stats",
        tags: ["GitHub"],
        summary: "Get GitHub profile statistics",
        description:
          "Fetches aggregated statistics (total stars, PRs, contributions) for the owner's GitHub profile.",
        protect: false,
      },
    })
    .input(z.void())
    .output(GithubStatsSchema.nullable())
    .query(async ({ ctx }) =>
      executeService(GetGithubStatsService, ctx, ctx.settings.NICKNAME),
    ),
});
