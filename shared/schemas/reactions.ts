import { z } from "zod";
import { zUuid, zDateOrString } from "./generic";

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
  commentId: zUuid,

  deletedAt: zDateOrString,
  createdAt: zDateOrString.nullable(),
  updatedAt: zDateOrString.nullable(),
});
