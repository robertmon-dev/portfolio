import { TRPCError } from "@trpc/server";
import { BaseService } from "../service";
import { commentWithRelationsQuery } from "./queries";
import type { GetCommentByIdServiceInput } from "./types";

export class GetCommentService extends BaseService {
  public execute(input: GetCommentByIdServiceInput) {
    const { commentId, includeDeleted } = input;

    const key = `comments:id:${commentId}`;

    return this.cache.wrap(key, 3600, async () => {
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
    });
  }
}
