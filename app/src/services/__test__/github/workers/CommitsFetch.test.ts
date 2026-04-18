import { useServiceTest } from "../../../../mocks/core";
import { describe, it, expect, vi } from "vitest";
import { GithubCommitFetchWorker } from "../../../github/workers/CommitsFetch";
import { createFakeGithubRepos, createFakeOctokitResponse } from "../utils";

const local = vi.hoisted(() => {
  const listCommitsMock = vi.fn();
  const OctokitMock = vi.fn(
    class {
      public auth: string;

      public constructor({ auth }: { auth: string }) {
        this.auth = auth;
      }

      public rest = { repos: { listCommits: listCommitsMock } };
    },
  );

  return {
    octokit: OctokitMock,
    listCommits: listCommitsMock,
  };
});

vi.mock("octokit", () => {
  return {
    Octokit: local.octokit,
  };
});

describe("GithubCommitFetchWorker", async () => {
  const ctx = useServiceTest(GithubCommitFetchWorker);

  it("Shall properly loads persisted repos", async () => {
    const persistedRepos = createFakeGithubRepos(20);
    const fakeList = createFakeOctokitResponse(20);

    ctx.mocks.prisma.githubRepo.findMany.mockResolvedValue(persistedRepos);
    local.listCommits.mockResolvedValue(fakeList);

    ctx.mocks.prisma.$transaction.mockImplementation(async (callback) => {
      return await callback(ctx.mocks.prisma);
    });

    await ctx.service.run();

    persistedRepos.map((repo, idx) => {
      expect(local.listCommits).toHaveBeenNthCalledWith(idx + 1, {
        owner: ctx.mocks.settings.NICKNAME,
        repo: repo.name,
        per_page: 5,
      });
    });
    expect(ctx.mocks.prisma.$transaction).toHaveBeenCalledTimes(20);
    expect(ctx.mocks.cache.del).toHaveBeenCalledTimes(26);
  });
});
