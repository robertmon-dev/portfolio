import { z } from "zod";
import { router } from "../../trpc/init";
import { publicProcedure } from "../../trpc/procedures/public";
import { ListGithubReposService } from "../../services/github/List";
import { executeService } from "../../trpc/executers/base";
import { GithubRepoSchema } from "@portfolio/shared";

export const githubRepoPublicRouter = router({
  listRepos: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/github/repos",
        tags: ["GitHub"],
        summary: "List GitHub repositories",
        description:
          "Returns a list of all tracked GitHub repositories with their stats like stars and forks.",
        protect: false,
      },
    })
    .input(z.void())
    .output(z.array(GithubRepoSchema))
    .query(async ({ ctx }) =>
      executeService(ListGithubReposService, ctx, undefined),
    ),
});
