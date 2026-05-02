import { Prisma } from "@prisma/client";

export const reactionQueryWithoutRelations = {
  select: {
    id: true,
    type: true,
    authorId: true,
    postId: true,
    commentId: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  },
} satisfies Prisma.ReactionDefaultArgs;

export const reactionQueryWithRelations = {
  include: {
    post: true,
    comment: true,
  },
} satisfies Prisma.ReactionDefaultArgs;
