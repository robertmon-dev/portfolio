import { Prisma } from "@prisma/client";

export const techStackWithRelationsQuery = {
  include: {
    projects: {
      select: {
        id: true,
        title: true,
        slug: true,
      },
    },
  },
} satisfies Prisma.TechStackDefaultArgs;

export type TechStackWithRelationsPayload = Prisma.TechStackGetPayload<
  typeof techStackWithRelationsQuery
>;
