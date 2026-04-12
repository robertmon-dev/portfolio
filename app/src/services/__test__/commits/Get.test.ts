import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetCommitService } from "../../commits/Get";
import { GithubCommitSchema } from "@portfolio/shared";
import {
  createPrismaMock,
  createCacheMock,
  createLoggerMock,
  createSettingsMock,
  MOCK_UUID,
} from "../../../mocks/core";
import { Caching } from "src/infrastructure/cache/types";
import { Logging } from "src/core/logger/types";
import { Settings } from "src/core/settings/settings";

describe("GetCommitService", () => {
  let mockDb: ReturnType<typeof createPrismaMock>;
  let mockCache: Caching;
  let mockLogger: Logging;
  let mockSettings: Settings["config"];
  let service: GetCommitService;

  beforeEach(() => {
    vi.clearAllMocks();

    mockDb = createPrismaMock();
    mockCache = createCacheMock();
    mockLogger = createLoggerMock();
    mockSettings = createSettingsMock();

    service = new GetCommitService(mockDb, mockCache, mockLogger, mockSettings);
  });

  it("should return null if commit is not found", async () => {
    mockDb.githubCommit.findUnique.mockResolvedValue(null);

    const result = await service.execute(MOCK_UUID);

    expect(result).toBeNull();
    expect(mockDb.githubCommit.findUnique).toHaveBeenCalledWith({
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

    mockDb.githubCommit.findUnique.mockResolvedValue(fakeCommit);

    const result = await service.execute(MOCK_UUID);

    const validated = GithubCommitSchema.parse(result);

    expect(validated.id).toBe(MOCK_UUID);
    expect(result?.sha).toBe("abc123sha");
    expect(mockLogger.debug).toHaveBeenCalled();
  });
});
