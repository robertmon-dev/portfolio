import { TRPCError } from "@trpc/server";
import { AuthorizedBaseService } from "../service";
import {
  ChangePublishionForPostInput,
  PostSchema,
  type Post,
} from "@portfolio/shared";
import { postWithRelationsQuery } from "./queries";
import type { ChangingVisibility } from "./types";

export class ChangePostVisilibityService
  extends AuthorizedBaseService
  implements ChangingVisibility
{
  public async execute(input: ChangePublishionForPostInput): Promise<Post> {
    const { id: postId, publishedAt } = input;

    return this.db.$transaction(async (tx) => {
      const persisted = await tx.post.findUnique({
        where: { id: postId },
        select: { id: true },
      });

      if (persisted === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No post with provided ID found",
        });
      }

      const updated = await tx.post.update({
        where: { id: postId },
        data: { publishedAt: publishedAt },
        ...postWithRelationsQuery,
      });

      await this.invalidatePostCache(persisted);

      return PostSchema.parse(updated);
    });
  }
}
