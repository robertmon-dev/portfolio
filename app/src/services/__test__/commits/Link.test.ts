import { describe, it, expect } from "vitest";
import { LinkGithubCommitService } from "../../../services/commits/Link";
import { useServiceTest } from "../../../mocks/core";
import { createFakeCommitWithRepo } from "./utils";

describe("LinkGithubCommitService", () => {
  const ctx = useServiceTest(LinkGithubCommitService);

  it("should throw NOT_FOUND when repo does not exist", async () => {
    ctx.mocks.prisma.githubRepo.findFirst.mockResolvedValue(null);
    ctx.mocks.prisma.$transaction.mockImplementation(async (callback) => {
      return await callback(ctx.mocks.prisma);
    });

    await expect(
      ctx.service.execute({
        githubCommitId: "c1",
        githubRepoId: "non-existent",
      }),
    ).rejects.toThrow(/not found/i);

    expect(ctx.mocks.logger.error).toHaveBeenCalled();
  });

  it("should update commit when repo exists", async () => {
    const mockCommitWithRepo = await createFakeCommitWithRepo({
      id: "c1",
      repoId: "repo-1",
    });

    ctx.mocks.prisma.githubRepo.findFirst.mockResolvedValue(
      mockCommitWithRepo.repo,
    );
    ctx.mocks.prisma.githubCommit.update.mockResolvedValue(mockCommitWithRepo);
    ctx.mocks.prisma.$transaction.mockImplementation(async (callback) => {
      return await callback(ctx.mocks.prisma);
    });

    const result = await ctx.service.execute({
      githubCommitId: "c1",
      githubRepoId: "repo-1",
    });

    expect(result).toEqual(mockCommitWithRepo);
    expect(ctx.mocks.prisma.githubCommit.update).toHaveBeenCalled();
  });
});
