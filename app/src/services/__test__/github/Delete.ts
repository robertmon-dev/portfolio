import { describe, expect, it } from "vitest";
import { useServiceTest } from "../../../mocks/core";
import { DeleteGithubRepoService } from "../../../services/github/Delete";
import { createFakeGithubRepos } from "./utils";
import { GithubRepoSchema } from "@portfolio/shared";

describe("DeleteGithubService", async () => {
  const ctx = useServiceTest(DeleteGithubRepoService);

  it("Shall properly remove github repo", async () => {
    const persisted = createFakeGithubRepos(1, true, true, true)[0];

    ctx.mocks.prisma.githubRepo.delete.mockResolvedValue(persisted);

    const removed = await ctx.service.execute(persisted.id);

    const typed = GithubRepoSchema.parse(removed);
    expect(typed).toHaveProperty("id");
    expect(ctx.mocks.cache.del).toHaveBeenCalledTimes(10);
  });
});
