import { TRPCError } from "@trpc/server";
import { AuthorizedBaseService } from "../service";
import {
  type AssignCommentsForPostInput,
  type Post,
  PostSchema,
} from "@portfolio/shared";
import { postWithRelationsQuery } from "./queries";

export class AssignCommentsForPostService extends AuthorizedBaseService {
  public async execute(input: AssignCommentsForPostInput): Promise<Post> {
    const { id: postId, commentIds } = input;

    return await this.db.$transaction(async (tx) => {
      const persisted = tx.post.findUnique({
        where: { id: postId },
        select: { id: true },
      });

      if (persisted === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Not found post with persisted ID",
        });
      }

      const updated = await tx.post.update({
        where: { id: postId },
        data: {
          comments: commentIds
            ? { set: commentIds.map((id) => ({ id })) }
            : undefined,
        },
        ...postWithRelationsQuery,
      });

      await this.invalidatePostCache(updated);

      return PostSchema.parse(updated);
    });
  }
}
