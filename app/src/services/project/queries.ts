import { Prisma } from "@prisma/client";

export const projectWithRelationsQuery = {
  include: {
    techStack: true,
    githubRepo: true,
    gallery: true,
  },
} satisfies Prisma.ProjectDefaultArgs;

export type ProjectWithRelationsPayload = Prisma.ProjectGetPayload<
  typeof projectWithRelationsQuery
>;

export const projectWithOrderedRelationsQuery = {
  include: {
    techStack: {
      orderBy: { name: "asc" },
    },
    gallery: {
      orderBy: { order: "asc" },
    },
    githubRepo: true,
  },
} satisfies Prisma.ProjectDefaultArgs;

export type ProjectWithOrderedRelationsPayload = Prisma.ProjectGetPayload<
  typeof projectWithRelationsQuery
>;
