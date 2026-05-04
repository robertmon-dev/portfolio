import { BaseService } from "../service";
import {
  TagCategorySchema,
  zSafeArray,
  type ListTagCategoriesInput,
  type ListTagCategoriesOutput,
} from "@portfolio/shared";
import { tagCategoryWithRelationsQuery } from "./queries";

export class ListTagCategoriesService extends BaseService {
  public async execute(
    input: ListTagCategoriesInput,
  ): Promise<ListTagCategoriesOutput> {
    const { limit, cursor } = input;
    const cacheKey = `categories:list:${limit}:${cursor ?? "first"}`;

    return await this.cache.wrap(cacheKey, 3600, async () => {
      const persisted = await this.db.tagCategory.findMany({
        take: limit + 1,
        skip: cursor ? 1 : undefined,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: "desc" },
        ...tagCategoryWithRelationsQuery,
      });

      let nextCursor: string | undefined;
      if (persisted.length > limit) {
        const dropped = persisted.pop();
        nextCursor = dropped?.id;
      }

      return {
        items: zSafeArray(TagCategorySchema).parse(persisted),
        nextCursor: nextCursor,
      };
    });
  }
}
