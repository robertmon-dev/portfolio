import { z } from "zod";
import { zUuid, zDateOrString, zString, zSafeArray } from "./generic";

export const REACTION_TYPE = [
  "LIKE",
  "LOVE",
  "HAHA",
  "WOW",
  "SAD",
  "ANGRY",
] as const;

export const ReactionType = z.enum(REACTION_TYPE);

export const ReactionSchema = z.object({
  id: zUuid,

  type: ReactionType,
  postId: zUuid.nullable(),

  authorId: zUuid,
  commentId: zUuid.nullable(),

  deletedAt: zDateOrString.nullable(),
  createdAt: zDateOrString.nullable(),
  updatedAt: zDateOrString.nullable(),
});

export const CreateReactionSchema = ReactionSchema.omit({
  id: true,
  authorId: true,
  deletedAt: true,
  updatedAt: true,
  createdAt: true,
}).refine((data) => (data.postId === null) !== (data.commentId === null), {
  message:
    "Either we come to an agreement, and you send me this, this, that and that or I will fire my intergalactic cannon in your fucking planet,",
  path: ["postId"],
});

export const UpdateReactionSchema = ReactionSchema.omit({
  authorId: true,
  deletedAt: true,
  updatedAt: true,
  createdAt: true,
});

export const RemoveReactionSchema = z.object({
  ids: zSafeArray(zString),
});

export const ListReactionsInputSchema = z.object({
  limit: z.number().min(1).max(50).default(5),
  cursor: zString.optional(),
});

export const ListReactionsOutputSchema = z.object({
  items: z.array(ReactionSchema),
  nextCursor: zString.optional(),
});
