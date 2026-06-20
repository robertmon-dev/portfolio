import { AuthorizedBaseService } from "../service";
import {
  CommentSchema,
  CommentWithReplies,
  UpdateCommentInput,
} from "@portfolio/shared";
import { commentWithRelationsQuery } from "./queries";
import { TRPCError } from "@trpc/server";
import { UpdatingComments } from "./types";

export class UpdateCommentService
  extends AuthorizedBaseService<UpdateCommentInput, CommentWithReplies>
  implements UpdatingComments
{
  public async execute(input: UpdateCommentInput): Promise<CommentWithReplies> {
    const { id: commentId, content } = input;

    const actor = this.ctx.user;
    const isStaff = ["ADMIN", "MODERATOR"].includes(actor.role);

    return this.db.$transaction(async (tx) => {
      const persisted = await tx.post.findUnique({
        where: { id: commentId, authorId: isStaff ? undefined : actor.id },
        select: { id: true },
      });

      if (persisted === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No comment with provided ID",
        });
      }

      const updated = await tx.comment.update({
        where: { id: commentId },
        data: {
          content: content,
        },
        ...commentWithRelationsQuery,
      });

      await Promise.all([
        this.cacheInvalidator.invalidatePostCache(updated.post),
        this.cacheInvalidator.invalidateCommentsCache(updated),
      ]);

      return CommentSchema.parse(updated);
    });
  }
}
