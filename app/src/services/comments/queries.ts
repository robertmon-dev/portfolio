import { Prisma } from "@prisma/client";
import { userPublicQuery } from "../user/queries";

export const commentWithoutRelationsQuery = {
  select: {
    id: true,
    visibility: true,
    authorId: true,
    content: true,
    isReply: true,
    parentId: true,
    postId: true,
    deletedAt: true,
    updatedAt: true,
    createdAt: true,
  },
} satisfies Prisma.CommentDefaultArgs;

export const commentWithRelationsQuery = {
  include: {
    post: true,
    author: {
      ...userPublicQuery,
    },
    parent: true,
    replies: true,
    reactions: true,
  },
} satisfies Prisma.CommentDefaultArgs;

export const commentWithListingRelationsQuery =
  {} satisfies Prisma.CommentDefaultArgs;
