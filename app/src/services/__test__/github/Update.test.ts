import { describe, expect, it } from "vitest";
import { useServiceTest } from "../../../mocks/core";
import { UpdateGithubRepoService } from "../../../services/github/Update";
import { createFakeGithubRepos } from "./utils";
import { GithubRepoSchema } from "@portfolio/shared";
import { githubRepoWithRelationsQuery } from "../../../services/github/queries";

describe("UpdateGithubRepoService", async () => {
  const ctx = useServiceTest(UpdateGithubRepoService);

  it("Shall updated targeted github repository", async () => {
    const updated = createFakeGithubRepos(1, true, true, true)[0];

    ctx.mocks.prisma.githubRepo.update.mockResolvedValue(updated);

    let data = createFakeGithubRepos(1)[0];

    const result = await ctx.service.execute(data);
    const { id, ...rest } = data;

    expect(ctx.mocks.prisma.githubRepo.update).toHaveBeenCalledWith({
      where: { id: updated.id },
      data: rest,
      ...githubRepoWithRelationsQuery,
    });
    expect(ctx.mocks.cache.del).toHaveBeenCalledTimes(10);
    const parsed = GithubRepoSchema.parse(result);
    expect(parsed).toBeTypeOf(typeof GithubRepoSchema);
    expect(parsed.id).toBeDefined();
  });
});
