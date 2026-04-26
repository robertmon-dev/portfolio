import { TRPCError } from "@trpc/server";
import { AuthorizedBaseService } from "../service";
import { type Post, PostSchema, DeletePostInput } from "@portfolio/shared";
import { postWithRelationsQuery } from "./queries";

export class DeletePostService extends AuthorizedBaseService {
  public async execute(input: DeletePostInput): Promise<Post> {
    const { id: postId } = input;

    return await this.db.$transaction(async (tx) => {
      const persisted = await tx.post.findUnique({
        where: { id: postId },
        select: { id: true },
      });

      if (persisted === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No post with provided ID",
        });
      }

      const updated = await tx.post.delete({
        where: { id: postId },
        ...postWithRelationsQuery,
      });

      this.invalidatePostCache(updated);

      return PostSchema.parse(updated);
    });
  }
}
