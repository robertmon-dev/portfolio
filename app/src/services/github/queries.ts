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
