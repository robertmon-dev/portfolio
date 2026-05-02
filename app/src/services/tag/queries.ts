import type { Prisma } from "@prisma/client";

export const tagWithoutRelationsQuery = {
  select: {
    id: true,
    name: true,
    slug: true,
    description: true,
    color: true,
    categoryId: true,
    createdAt: true,
    updatedAt: true,
  },
} satisfies Prisma.TagDefaultArgs;

export const tagWithRelationsQuery = {
  include: {
    category: true,
    posts: true,
  },
} satisfies Prisma.TagDefaultArgs;
