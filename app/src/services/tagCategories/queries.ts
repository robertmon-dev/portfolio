import type { Prisma } from "@prisma/client";

export const tagCategoryWithRelationsQuery = {
  include: {
    categories: {
      select: { id: true, name: true, createdAt: true, updatedAt: true },
    },
    tags: true,
  },
} satisfies Prisma.TagCategoryDefaultArgs;

export const tagCategoryWithFullRelationsQuery = {
  include: {
    parent: true,
    categories: {
      select: { id: true, name: true, createdAt: true, updatedAt: true },
    },
    tags: true,
  },
} satisfies Prisma.TagCategoryDefaultArgs;
