import { describe, expect, it } from "vitest";
import { useServiceTest } from "../../../mocks/core";
import { LinkRepoProjectService } from "../../../services/github/Link";
import { createFakeGithubRepos, createFakeGithubStats } from "./utils";
import { createFakeProjects } from "../projects/utils";

describe("LinkRepoProjectsService", async () => {
  const ctx = useServiceTest(LinkRepoProjectService);

  it("Shall properly unlink repo from project", async () => {
    let updatedRepo = createFakeGithubRepos(1)[0];
    const project = createFakeProjects(1)[0];
    const stats = createFakeGithubStats(1)[0];
    updatedRepo.project = project;
    updatedRepo.statsId = stats.id;
    updatedRepo.stats = stats;

    ctx.mocks.prisma.$transaction.mockImplementation(async (callback) => {
      return await callback(ctx.mocks.prisma);
    });

    ctx.mocks.prisma.githubRepo.update.mockResolvedValue(updatedRepo);
    ctx.mocks.prisma.project.findUniqueOrThrow.mockResolvedValue({
      slug: project.slug,
    });

    const mergedRepo = await ctx.service.execute({
      repoId: updatedRepo.id,
      projectId: project.id,
    });

    expect(mergedRepo).toBe(updatedRepo);
    expect(ctx.mocks.cache.del).toHaveBeenCalledTimes(10);
  });
});
