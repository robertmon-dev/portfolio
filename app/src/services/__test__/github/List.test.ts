import { z } from "zod";
import { describe, expect, it } from "vitest";
import { useServiceTest } from "../../../mocks/core";
import { ListGithubReposService } from "../../../services/github/List";
import { createFakeGithubRepos } from "./utils";
import { GithubRepoSchema } from "@portfolio/shared";

describe("ListGithubReposService", async () => {
  const ctx = useServiceTest(ListGithubReposService);

  it("Shall properly fetch persisted github repos", async () => {
    const persisted = createFakeGithubRepos(20);
    ctx.mocks.prisma.githubRepo.findMany.mockResolvedValue(persisted);

    const result = await ctx.service.execute();

    expect(ctx.mocks.prisma.githubRepo.findMany).toHaveBeenCalledWith({
      orderBy: {
        stars: "desc",
      },
      include: {
        project: true,
      },
    });

    const testSchema = z.array(GithubRepoSchema);
    const parsed = testSchema.parse(result);

    expect(parsed).toBeTypeOf(typeof z.array(GithubRepoSchema));
    expect(parsed.length).toBe(20);
  });
});
