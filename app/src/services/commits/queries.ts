import { Prisma } from "@prisma/client";

export const githubCommitWithRelationsQuery = {
  include: {
    repo: {
      include: {
        project: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    },
  },
} satisfies Prisma.GithubCommitDefaultArgs;

export type GithubCommitWithRelations = Prisma.GithubCommitGetPayload<
  typeof githubCommitWithRelationsQuery
>;
