import { TRPCError } from "@trpc/server";
import { AuthorizedBaseService } from "../service";
import { type UpdatePostInput, type Post, PostSchema } from "@portfolio/shared";
import { postWithRelationsQuery } from "./queries";

export class UpdatePostService extends AuthorizedBaseService {
  public async execute(input: UpdatePostInput): Promise<Post> {
    const { id: postId } = input;

    return await this.db.$transaction(async (tx) => {
      const persisted = tx.post.findUnique({
        where: { id: postId },
        select: { id: true },
      });

      if (persisted === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "no post with provided id",
        });
      }

      const updated = await tx.post.update({
        where: { id: postId },
        data: { ...input },
        ...postWithRelationsQuery,
      });

      await this.invalidatePostCache(updated);

      return PostSchema.parse(updated);
    });
  }
}
