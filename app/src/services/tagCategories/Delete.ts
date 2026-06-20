import { AuthorizedBaseService } from "../service";
import type { TagCategory } from "@portfolio/shared";
import type { Tag } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { tagCategoryWithFullRelationsQuery } from "./queries";

export class DeleteTagCategoriesService extends AuthorizedBaseService<
  string[],
  TagCategory[]
> {
  public async execute(ids: string[]): Promise<TagCategory[]> {
    const removed = await this.db.$transaction(async (tx) => {
      const persisted = await tx.tagCategory.findMany({
        where: {
          id: { in: ids },
        },
        ...tagCategoryWithFullRelationsQuery,
      });

      if (persisted.length !== ids.length) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Not all of the passed IDs are persisted in database",
        });
      }

      await tx.tagCategory.deleteMany({
        where: {
          id: { in: ids },
        },
      });

      return persisted;
    });

    const tags: Tag[] = [];
    removed.forEach((category) => {
      tags.push(...category.tags);
    });

    await Promise.all([
      this.cacheInvalidator.invalidateTagsCache(...tags),
      this.cacheInvalidator.invalidateCategoriesCache(...removed),
    ]);

    return removed;
  }
}
