import type { GithubRepo, GithubStats } from "@prisma/client";
import { MOCK_UUID } from "../../../mocks/core";
import { randomInt, randomUUID } from "crypto";
import { createFakeCommits } from "../commits/utils";

export const createFakeOctokitCommitsResponse = (count: number) => {
  const body = Array.from({ length: count }).map((_, idx) => ({
    commit: {
      message: `test(app/${idx}): solve next dumb mocks just as a proof of Moń\n\nCompletely random text that will just fall into split statement and will be destructured as description parts after spread\n\nAnd this is just and next line to satisfy more cases`,
      commiter: { date: new Date() },
      author: { date: new Date() },
      sha: randomUUID(),
      html_url: "http://web.com",
    },
  }));

  return {
    data: body,
  };
};

export const createFakeOctokitReposResponse = (count: number) => {
  const body = Array.from({ length: count }).map((_, idx) => ({
    name: `name-${idx}`,
    stargazers_count: randomInt(20),
    language: `language-${idx}`,
    description: `description-${idx}`,
    html_url: "http://web.com",
  }));

  return {
    data: body,
  };
};

export const createFakeOctokitUsersResponse = () => {
  return {
    data: {
      followers: randomInt(12),
      public_repos: randomInt(10),
    },
  };
};

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
