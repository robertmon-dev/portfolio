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
  stats = false,
) => {
  return Array.from({ length: count }).map((_, idx) => ({
    id: MOCK_UUID,
    name: `name-${idx}`,
    stars: idx,
    language: `language-${idx}`,
    description: `description-${MOCK_UUID}`,
    url: `http://web.com`,
    stats: stats ? {} : null,
    statsId: randomUUID() as string,
    commits: commits ? createFakeCommits(count) : [],
    project: projects
      ? {
          id: MOCK_UUID,
          slug: `slug-${idx}`,
          title: `title-${idx}`,
          description: `description-${idx}`,
          content: `content-${idx}`,

          imageUrl: `https://web.com`,
          demoUrl: `https://demo.com`,

          isFeatured: idx % 2 === 0,
          isVisible: idx % 2 === 0,

          createdAt: new Date(),
          updatedAt: new Date(),

          techStack: [],
          gallery: [],

          githubRepoId: MOCK_UUID,
          githubRepo: { id: MOCK_UUID },
        }
      : null,
    projectId: MOCK_UUID,
    order: idx,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
};
