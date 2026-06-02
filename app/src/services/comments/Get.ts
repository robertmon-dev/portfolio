import { TRPCError } from "@trpc/server";
import { BaseService } from "../service";
import { commentWithRelationsQuery } from "./queries";
import type { FetchingComments, GetCommentByIdServiceInput } from "./types";
import { type CommentWithReplies, CommentSchema } from "@portfolio/shared";

export class GetCommentService
  extends BaseService<GetCommentByIdServiceInput, CommentWithReplies>
  implements FetchingComments
{
  public async execute(
    input: GetCommentByIdServiceInput,
  ): Promise<CommentWithReplies> {
    const { commentId, includeDeleted } = input;
    const key = `comments:id:${commentId}`;

    return await this.cache.wrap(key, 3600, async () => {
      const persisted = await this.db.comment.findUnique({
        where: {
          id: commentId,
          deletedAt: !includeDeleted ? null : undefined,
        },
        ...commentWithRelationsQuery,
      });

      if (persisted === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No comment with provided ID",
        });
      }

      return CommentSchema.parse(persisted);
    });
  }
}
