import { describe, it, expect } from "vitest";
import { DeleteCommitService } from "../../commits/Delete";
import { useServiceTest } from "../../../mocks/core";
import { createFakeCommits } from "./utils";

describe("DeleteCommitService", () => {
  const ctx = useServiceTest(DeleteCommitService);

  it("Properly removes target commits", async () => {
    const commits = createFakeCommits(20);
    const commitsIds = commits.map((commit) => commit.id);

    ctx.mocks.prisma.githubCommit.findMany.mockResolvedValue(commits);
    ctx.mocks.prisma.githubCommit.deleteMany.mockResolvedValue({
      count: commits.length,
    });

    await ctx.service.execute(commitsIds);

    expect(ctx.mocks.prisma.githubCommit.findMany).toHaveBeenCalledWith({
      where: { id: { in: commitsIds } },
      select: { id: true, repoId: true },
    });

    expect(ctx.mocks.prisma.githubCommit.deleteMany).toHaveBeenCalledWith({
      where: { id: { in: commitsIds } },
    });

    expect(ctx.mocks.cache.del).toHaveBeenCalledTimes(26);
  });
});
