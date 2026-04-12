import { describe, it, expect } from "vitest";
import { GetCommitService } from "../../commits/Get";
import { GithubCommitSchema } from "@portfolio/shared";
import { useServiceTest, MOCK_UUID } from "../../../mocks/core";

describe("GetCommitService", () => {
  const ctx = useServiceTest(GetCommitService);

  it("should return null if commit is not found", async () => {
    ctx.mocks.prisma.githubCommit.findUnique.mockResolvedValue(null);

    const result = await ctx.service.execute(MOCK_UUID);

    expect(result).toBeNull();
    expect(ctx.mocks.prisma.githubCommit.findUnique).toHaveBeenCalledWith({
      where: { id: MOCK_UUID },
    });
  });

  it("should return a parsed commit if it exists", async () => {
    const fakeCommit = {
      id: MOCK_UUID,
      sha: "abc123sha",
      message: "feat: add tests",
      author: "Robert",
      date: new Date().toISOString(),
      url: "https://github.com/robertmon-dev/portfolio",
      repoId: MOCK_UUID,
      description: "Sample description",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    ctx.mocks.prisma.githubCommit.findUnique.mockResolvedValue(fakeCommit);

    const result = await ctx.service.execute(MOCK_UUID);
    const validated = GithubCommitSchema.parse(result);

    expect(validated.id).toBe(MOCK_UUID);
    expect(result?.sha).toBe("abc123sha");
    expect(ctx.mocks.logger.debug).toHaveBeenCalled();
  });
});
