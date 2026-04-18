import type { GithubRepo, GithubStats } from "@prisma/client";
import { MOCK_UUID } from "../../../mocks/core";
import { randomUUID } from "crypto";
import { createFakeCommits } from "../commits/utils";

export const createFakeGithubStats = (
  count: number,
  repos: GithubRepo[] = [],
): GithubStats[] => {
  return Array.from({ length: count }).map((_, idx) => ({
    id: randomUUID(),
    username: `username-${idx}`,
    followers: idx,
    publicRepos: idx,
    totalStars: idx,
    repos: repos,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
};

export const createFakeGithubRepos = (
  count: number,
  commits = false,
  projects = false,
): GithubRepo[] => {
  return Array.from({ length: count }).map((_, idx) => ({
    id: randomUUID(),
    name: `name-${idx}`,
    stars: idx,
    language: `language-${idx}`,
    description: `description-${MOCK_UUID}`,
    url: `http://web.com`,
    statsId: randomUUID(),
    commits: commits ? createFakeCommits(count) : [],
    projects: projects ? [] : [],
    order: idx,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
};
