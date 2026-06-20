import { Tag } from "@portfolio/shared";
import { BaseService } from "../service";
import { TRPCError } from "@trpc/server";
import { tagWithRelationsQuery } from "./queries";
import { Post } from "@prisma/client";

export class DeleteTagsService extends BaseService<string[], Tag[]> {
  public async execute(ids: string[]): Promise<Tag[]> {
    const removed = await this.db.$transaction(async (tx) => {
      const persisted = await tx.tag.findMany({
        where: { id: { in: ids } },
        ...tagWithRelationsQuery,
      });

      if (persisted.length !== ids.length) {
        throw new TRPCError({
          code: "UNPROCESSABLE_CONTENT",
          message: "Some of the IDs are not present in database",
        });
      }

      await tx.tag.deleteMany({
        where: { id: { in: ids } },
      });

      return persisted;
    });

    const posts: Post[] = [];
    removed.map((tag) => {
      posts.push(...tag.posts);
    });

    await Promise.all([
      this.cacheInvalidator.invalidateTagsCache(...removed),
      this.cacheInvalidator.invalidatePostCache(...posts),
    ]);

    return removed;
  }
}
