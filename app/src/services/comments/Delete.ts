import { z } from "zod";
import {
  CommentSchema,
  CommentWithReplies,
  DeleteCommentsInput,
} from "@portfolio/shared";
import { AuthorizedBaseService } from "../service";
import { TRPCError } from "@trpc/server";
import { commentWithRelationsQuery } from "./queries";

export class DeleteCommentsService extends AuthorizedBaseService {
  public async execute(
    input: DeleteCommentsInput,
  ): Promise<CommentWithReplies[]> {
    const { commentIds } = input;

    return await this.db.$transaction(async (tx) => {
      const persisted = await tx.comment.findMany({
        where: { id: { in: [...commentIds] } },
        select: { id: true },
      });

      if (commentIds.length !== persisted.length) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Some of the provided comments are not present in storage",
        });
      }

      const deleted = await tx.comment.updateManyAndReturn({
        where: { id: { in: [...commentIds] } },
        data: { deletedAt: new Date() },
        ...commentWithRelationsQuery,
      });

      const posts = deleted.map((comment) => {
        return comment.post;
      });

      await this.invalidateCommentsCache(...deleted);
      await this.invalidatePostCache(...posts);

      return z.array(CommentSchema).parse(deleted);
    });
  }
}
