import { Prisma } from "@prisma/client";
import { userPublicQuery } from "../user/queries";

export const postWithRelationsQuery = {
  include: {
    author: {
      ...userPublicQuery,
    },
    comments: {
      include: {
        reactions: { where: { deletedAt: null } },
        replies: {
          include: {
            reactions: {
              where: { deletedAt: null },
            },
          },
        },
      },
      where: { deletedAt: null },
    },
    reactions: {
      where: {
        deletedAt: null,
      },
    },
    tags: true,
  },
} satisfies Prisma.PostDefaultArgs;

export const postWithEternalRelationsQuery = {
  include: {
    author: {
      ...userPublicQuery,
    },
    comments: {
      include: {
        reactions: true,
        replies: {
          include: {
            reactions: true,
          },
        },
      },
    },
    reactions: true,
    tags: true,
  },
} satisfies Prisma.PostDefaultArgs;

export type PostWithRelationsRow = Prisma.PostGetPayload<
  typeof postWithRelationsQuery
>;

export type PostWithEternalRelationsRow = Prisma.PostGetPayload<
  typeof postWithEternalRelationsQuery
>;

export const mapPostRelations = (post: PostWithRelationsRow) => ({
  ...post,
  tagIds: post.tags.map((tag) => tag.id),
  commentIds: post.comments.map((comment) => comment.id),
  reactionIds: post.reactions.map((reaction) => reaction.id),
});
