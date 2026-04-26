import { AuthorizedBaseService } from "../service";
import { Comment, CommentSchema, UpdateCommentInput } from "@portfolio/shared";
import { commentWithRelationsQuery } from "./queries";
import { TRPCError } from "@trpc/server";

export class UpdateCommentService extends AuthorizedBaseService {
  public async execute(input: UpdateCommentInput): Promise<Comment> {
    const { id: commentId, content } = input;

    return this.db.$transaction(async (tx) => {
      const persisted = await tx.post.findUnique({
        where: { id: commentId },
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

      await this.invalidatePostCache(updated.post);
      await this.invalidateCommentsCache(updated);

      return CommentSchema.parse(updated);
    });
  }
}
