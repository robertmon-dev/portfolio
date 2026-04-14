import { MOCK_UUID } from "../../../mocks/core";
import type { GithubCommit, GithubRepo } from "@prisma/client";

export type GithubCommitWithRepo = GithubCommit & { repo: GithubRepo };

export const createFakeCommits = (count: number) =>
  Array.from({ length: count }).map((_, i) => ({
    id: `${MOCK_UUID.slice(0, -1)}${i}`,
    sha: `sha-${i}`,
    message: `Commit ${i}`,
    author: "Robert",
    date: new Date().toISOString(),
    url: `https://github.com/repo/commit/${i}`,
    repoId: MOCK_UUID,
    description: "Description",
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

export const createFakeCommitWithRepo = async (
  overrides: Partial<GithubCommitWithRepo> = {},
): Promise<GithubCommitWithRepo> => {
  const repoId = overrides.repoId ?? MOCK_UUID;

  const fakeRepo: GithubRepo = {
    id: repoId,
    name: "portfolio",
    url: "https://github.com/user/portfolio",
    stars: 10,
    language: "typescript",
    description: "My awesome portfolio",
    order: 2,
    statsId: MOCK_UUID,
  };

  const fakeCommit: GithubCommitWithRepo = {
    id: MOCK_UUID,
    sha: "sha-abc-123",
    message: "Initial commit",
    date: new Date(),
    url: `https://github.com/repo/commit/1`,
    repoId: repoId,
    description: "Description",
    createdAt: new Date(),
    updatedAt: new Date(),
    repo: fakeRepo,
    isFeatured: true,
    ...overrides,
  };

  return fakeCommit;
};
