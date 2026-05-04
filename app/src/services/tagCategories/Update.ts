import { TRPCError } from "@trpc/server";
import { BaseService } from "../service";
import type { TagCategory, UpdateTagCategoryInput } from "@portfolio/shared";
import { tagCategoryWithRelationsQuery } from "./queries";

export class UpdateTagCategory extends BaseService {
  public async execute(input: UpdateTagCategoryInput): Promise<TagCategory> {
    const updated = await this.db.$transaction(async (tx) => {
      const persisted = tx.tagCategory.findUnique({
        where: { id: input.id },
        select: { id: true },
      });

      if (persisted === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No such tag category is persisted",
        });
      }

      return await tx.tagCategory.update({
        where: { id: input.id },
        data: {
          name: input.name,
        },
        ...tagCategoryWithRelationsQuery,
      });
    });

    await Promise.all([
      this.invalidateCategoriesCache(updated),
      this.invalidateTagsCache(...updated.tags),
    ]);

    return updated;
  }
}
