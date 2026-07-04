import { z } from "zod";
import {
  CommentSchema,
  CommentWithReplies,
  DeleteCommentsInput,
} from "@portfolio/shared";
import { AuthorizedBaseService } from "../service";
import { TRPCError } from "@trpc/server";
import { commentWithRelationsQuery } from "./queries";
import { RestoringComments } from "./types";

export class RestoreCommentsService
  extends AuthorizedBaseService<DeleteCommentsInput, CommentWithReplies[]>
  implements RestoringComments
{
  public async execute(
    input: DeleteCommentsInput,
  ): Promise<CommentWithReplies[]> {
    const { commentIds } = input;

    return await this.db.$transaction(async (tx) => {
      const persisted = await tx.comment.findMany({
        where: { id: { in: commentIds } },
        select: { id: true },
      });

      if (commentIds.length !== persisted.length) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Some of the provided comments are not present in storage",
        });
      }

      await tx.comment.updateMany({
        where: { id: { in: commentIds } },
        data: { deletedAt: null },
      });

      const restored = await tx.comment.findMany({
        where: { id: { in: commentIds } },
        ...commentWithRelationsQuery,
      });

      const posts = restored.map((comment) => {
        return comment.post;
      });

      await Promise.all([
        this.cacheInvalidator.invalidateCommentsCache(...restored),
        this.cacheInvalidator.invalidatePostCache(...posts),
      ]);

      return z.array(CommentSchema).parse(restored);
    });
  }
}
