import { describe, it, expect, beforeEach } from "vitest";
import { GetCommitService } from "../../commits/Get";
import { GithubCommitSchema } from "@portfolio/shared";
import { baseServiceUtilities, MOCK_UUID } from "../../../mocks/core";
import { ServiceMock } from "../../../mocks/types";
import type { CommitRetrieving } from "../../../services/commits/types";

describe("GetCommitService", () => {
  let mocks: ServiceMock;
  let service: CommitRetrieving;

  beforeEach(() => {
    mocks = baseServiceUtilities();
    mocks.clearAll();

    service = new GetCommitService(
      mocks.prisma,
      mocks.cache,
      mocks.logger,
      mocks.settings,
    );
  });

  it("should return null if commit is not found", async () => {
    mocks.prisma.githubCommit.findUnique.mockResolvedValue(null);

    const result = await service.execute(MOCK_UUID);

    expect(result).toBeNull();
    expect(mocks.prisma.githubCommit.findUnique).toHaveBeenCalledWith({
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

    mocks.prisma.githubCommit.findUnique.mockResolvedValue(fakeCommit);

    const result = await service.execute(MOCK_UUID);

    const validated = GithubCommitSchema.parse(result);

    expect(validated.id).toBe(MOCK_UUID);
    expect(result?.sha).toBe("abc123sha");
    expect(mocks.logger.debug).toHaveBeenCalled();
  });
});
