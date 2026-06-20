import {
  type TagCategory,
  type AssignTagsInput,
  zSafeArray,
  TagCategorySchema,
} from "@portfolio/shared";
import { AuthorizedBaseService } from "../service";
import { tagCategoryWithRelationsQuery } from "./queries";

export class AssignTagsService extends AuthorizedBaseService<
  AssignTagsInput,
  TagCategory[]
> {
  public async execute(input: AssignTagsInput): Promise<TagCategory[]> {
    const assigned = await this.db.$transaction(async (tx) => {
      const persisted = await tx.tagCategory.update({
        where: { id: input.tagCategoryId },
        data: {
          tags: input.tags,
        },
        ...tagCategoryWithRelationsQuery,
      });

      return persisted;
    });

    await Promise.all([
      this.cacheInvalidator.invalidateCategoriesCache(assigned),
      this.cacheInvalidator.invalidateTagsCache(...assigned.tags),
    ]);

    return zSafeArray(TagCategorySchema).parse(assigned);
  }
}
