import { Prisma } from "@prisma/client";
import { userPublicQuery } from "../user/queries";

export const postWithRelationsQuery = {
  include: {
    author: {
      ...userPublicQuery,
    },
    comments: true,
    reactions: true,
  },
} satisfies Prisma.PostDefaultArgs;
