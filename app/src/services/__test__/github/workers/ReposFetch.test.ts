import { useServiceTest } from "../../../../mocks/core";
import { GithubFetchWorker } from "../../../../services/github/workers/ReposFetch";
import { describe, it, vi, expect } from "vitest";
import {
  createFakeGithubRepos,
  createFakeOctokitReposResponse,
  createFakeOctokitUsersResponse,
} from "../utils";
import { MOCK_UUID } from "../../../../mocks/core";
import { createFakeProjects } from "../../projects/utils";

const local = vi.hoisted(() => {
  const mockGetByUsername = vi.fn();
  const mockListForUser = vi.fn();

  const OctokitMock = vi.fn(
    class {
      public auth: string;

      public constructor({ auth }: { auth: string }) {
        this.auth = auth;
      }

      public rest = {
        users: {
          getByUsername: mockGetByUsername,
        },
        repos: {
          listForUser: mockListForUser,
        },
      };
    },
  );

  return {
    getByUsername: mockGetByUsername,
    listForUser: mockListForUser,
    octokit: OctokitMock,
  };
});

vi.mock("octokit", () => {
  return {
    Octokit: local.octokit,
  };
});

describe("GithubFetchWorker", () => {
  const ctx = useServiceTest(GithubFetchWorker);

  it("Shall properly fetch user and repos from octokit and persisted fetched data", async () => {
    const userResponse = createFakeOctokitUsersResponse();
    const reposReponse = createFakeOctokitReposResponse(1);
    const persistedProjects = createFakeProjects(1);
    const persistedRepo = createFakeGithubRepos(1)[0];

    ctx.mocks.prisma.$transaction.mockImplementation(async (callback) => {
      return await callback(ctx.mocks.prisma);
    });
    local.getByUsername.mockResolvedValue(userResponse);
    local.listForUser.mockResolvedValue(reposReponse);
    ctx.mocks.prisma.githubStats.upsert.mockResolvedValue({
      id: MOCK_UUID,
    });

    ctx.mocks.prisma.githubRepo.upsert.mockResolvedValue(persistedRepo);
    ctx.mocks.prisma.project.findMany.mockResolvedValue(persistedProjects);

    await ctx.service.run();

    expect(ctx.mocks.cache.del).toHaveBeenCalledTimes(10);
  });
});
