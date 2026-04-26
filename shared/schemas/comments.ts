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

export const CommentSchema: z.ZodType<Comment> = z.lazy(() =>
  z.object({
    id: zUuid,
    visibility: RoleEnum,

    authorId: zUuid,
    content: zString,
    isReply: z.boolean(),

    parentId: zUuid.nullable(),
    parent: CommentSchema.nullable(),

    replies: zSafeArray(CommentSchema),
    reactions: zSafeArray(ReactionSchema),

    deletedAt: zDateOrString.nullable(),
    createdAt: zDateOrString,
    updatedAt: zDateOrString.nullable(),
  }),
);
