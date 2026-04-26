import { TRPCError } from "@trpc/server";
import { AuthorizedBaseService } from "../service";
import {
  AssignTagsForPostInput,
  PostSchema,
  type Post,
} from "@portfolio/shared";
import { postWithRelationsQuery } from "./queries";

export class ChangePostVisilibityService extends AuthorizedBaseService {
  public async execute(input: AssignTagsForPostInput): Promise<Post> {
    const { id: postId, tagIds } = input;

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
        data: {
          tags: tagIds
            ? {
                set: tagIds.map((id) => ({ id })),
              }
            : undefined,
        },
        ...postWithRelationsQuery,
      });

      await this.invalidatePostCache(persisted);

      return PostSchema.parse(updated);
    });
  }
}
