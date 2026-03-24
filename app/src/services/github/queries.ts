import { Prisma } from "@prisma/client";

export const githubRepoWithRelationsQuery = {
  include: {
    stats: true,
    project: true,
  },
} satisfies Prisma.GithubRepoDefaultArgs;

export type GithubRepoWithRelations = Prisma.GithubRepoGetPayload<
  typeof githubRepoWithRelationsQuery
>;

export const githubStatsWithDeepRelationsQuery = {
  include: {
    repos: {
      include: {
        project: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    },
  },
};

export type GithubStatsWithDeepRelations = Prisma.GithubStatsGetPayload<
  typeof githubStatsWithDeepRelationsQuery
>;
