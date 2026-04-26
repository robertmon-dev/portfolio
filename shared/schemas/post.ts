import { z } from "zod";
import { zString, zUuid, zUrl, zDateOrString, zSafeArray } from "./generic";
import { RoleEnum } from "./permission";
import { UserPublicSchema } from "./user";
import { ReactionSchema } from "./reactions";
import { CommentSchema } from "./comments";
import { TagSchema } from "./tags";

export const PostSchema = z.object({
  id: zUuid,
  title: zString,
  subtitle: zString.nullable(),
  slug: zString,
  excerpt: zString.nullable(),
  content: zString,
  footer: zString.nullable(),

  coverImageUrl: zUrl.nullable(),
  visibility: RoleEnum,

  viewCount: z.number(),

  authorId: zUuid,
  author: UserPublicSchema.nullable(),

  reactionIds: zSafeArray(zUuid),
  reactions: zSafeArray(ReactionSchema),
  commentIds: zSafeArray(zUuid),
  comments: zSafeArray(CommentSchema),
  tagIds: zSafeArray(zUuid),
  tags: zSafeArray(TagSchema),

  publishedAt: zDateOrString.nullable(),
  deletedAt: zDateOrString.nullable(),
  updatedAt: zDateOrString,
  createdAt: zDateOrString,
});

export const CreatePostSchema = PostSchema.omit({
  id: true,
  author: true,
  authorId: true,
  viewCount: true,
  reactionIds: true,
  reactions: true,
  commentIds: true,
  comments: true,
  tags: true,
  deletedAt: true,
  updatedAt: true,
  createdAt: true,
});

export const UpdatePostSchema = PostSchema.omit({
  reactionIds: true,
  commentIds: true,
  tagIds: true,
  authorId: true,
  author: true,
  comments: true,
  tags: true,
  reactions: true,
});

export const AssignTagsForPostSchema = PostSchema.pick({
  id: true,
  tagIds: true,
});

export const AssignCommentsForPostSchema = PostSchema.pick({
  id: true,
  commentIds: true,
});

export const ChangeVisibilityForPostSchema = PostSchema.pick({
  id: true,
  visibility: true,
});

export const ChangePublishionForPostSchema = PostSchema.pick({
  id: true,
  publishedAt: true,
});

export const DeletePostSchema = PostSchema.pick({
  id: true,
});

export const AssignReactionsForPostSchema = PostSchema.pick({
  id: true,
  reactionIds: true,
});

export const ListPostsInputSchema = z.object({
  limit: z.number().min(1).max(50).default(5),
  cursor: zString.optional(),
});

export const ListPostsOutputSchema = z.object({
  items: z.array(PostSchema),
  nextCursor: zString.optional(),
});
