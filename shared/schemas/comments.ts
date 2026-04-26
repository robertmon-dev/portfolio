import { z } from "zod";
import { zUuid, zString, zSafeArray, zDateOrString } from "./generic";
import { RoleEnum } from "./permission";
import { ReactionSchema } from "./reactions";

export interface Comment {
  id: string;
  visibility: z.infer<typeof RoleEnum>;
  authorId: string;
  content: string;
  isReply: boolean;
  parentId: string | null;
  replies: Comment[];
  reactions: z.infer<typeof ReactionSchema>[];
  deletedAt: string | Date | null;
  createdAt: string | Date;
  updatedAt: string | Date | null;
}

export const BaseCommentSchema = z.object({
  id: zUuid,
  visibility: RoleEnum,
  authorId: zUuid,
  postId: zUuid,
  content: zString,
  isReply: z.boolean(),
  parentId: zUuid.nullable(),
  reactions: zSafeArray(ReactionSchema),
  deletedAt: zDateOrString.nullable(),
  createdAt: zDateOrString,
  updatedAt: zDateOrString.nullable(),
});

export const CreateCommentSchema = BaseCommentSchema.omit({
  id: true,
  authorId: true,
  deletedAt: true,
  reactions: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateCommentSchema = BaseCommentSchema.pick({
  id: true,
  content: true,
});

export const CommentSchema: z.ZodType<Comment> = BaseCommentSchema.extend({
  parent: z.lazy(() => CommentSchema.nullable()),
  replies: z.lazy(() => zSafeArray(CommentSchema)),
});

export const DeleteCommentsSchema = z.object({
  commentIds: zUuid,
});

export const CreateReplySchema = BaseCommentSchema.extend({
  parentId: zUuid,
});

export const ListCommentsInputSchema = z.object({
  limit: z.number().min(1).max(50).default(5),
  cursor: zString.optional(),
});

export const ListCommentsOutputSchema = z.object({
  items: z.array(CommentSchema),
  nextCursor: zString.optional(),
});

export const ListCommentsByPostSchema = ListCommentsInputSchema.extend({
  postId: zUuid,
});

export const ListCommentsByParentSchema = ListCommentsInputSchema.extend({
  parentId: zUuid,
});
