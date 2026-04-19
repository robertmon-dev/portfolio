import { describe, expect, it } from "vitest";
import { useServiceTest } from "../../../mocks/core";
import { UnlinkRepoProjectService } from "../../../services/github/Unlink";
import { createFakeGithubRepos, createFakeGithubStats } from "./utils";
import { githubRepoWithRelationsQuery } from "../../../services/github/queries";
import { createFakeProjects } from "../projects/utils";

describe("UnlinkRepoProjectService", async () => {
  const ctx = useServiceTest(UnlinkRepoProjectService);

  it("Shall properly unlink already merged records", async () => {
    let updatedRepo = createFakeGithubRepos(1, false, true, false)[0];
    const project = createFakeProjects(1)[0];
    const stats = createFakeGithubStats(1)[0];

    updatedRepo.stats = stats;
    updatedRepo.project = project;
    expect(updatedRepo.project).toBeDefined();

    const resolved = await ctx.service.execute(updatedRepo.id);

    ctx.mocks.prisma.$transaction.mockImplementation((callback) =>
      callback(ctx.mocks.prisma),
    );
    ctx.mocks.prisma.githubRepo.findUnique.mockResolvedValue(updatedRepo);
    ctx.mocks.prisma.githubRepo.update.mockResolvedValue(updatedRepo);
    expect(ctx.mocks.prisma.githubRepo.findUnique).toHaveBeenCalledWith({
      where: { id: updatedRepo.id },
      ...githubRepoWithRelationsQuery,
    });
    expect(ctx.mocks.cache.del).toHaveBeenCalledTimes(10);
    expect(ctx.mocks.prisma.githubRepo.update).toHaveBeenCalledWith({
      where: { id: updatedRepo.id },
      data: { project: { disconnect: true } },
      ...githubRepoWithRelationsQuery,
    });
    expect(resolved).toBeDefined();
  });
});
