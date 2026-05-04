import { AuthorizedBaseService } from "../service";
import { Comment, CommentSchema, UpdateCommentInput } from "@portfolio/shared";
import { commentWithRelationsQuery } from "./queries";
import { TRPCError } from "@trpc/server";

export class UpdateCommentService extends AuthorizedBaseService {
  public async execute(input: UpdateCommentInput): Promise<Comment> {
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
        this.invalidatePostCache(updated.post),
        this.invalidateCommentsCache(updated),
      ]);

      return CommentSchema.parse(updated);
    });
  }
}
