import z from "zod";
import {
  type ListTagsOutput,
  TagSchema,
  ListTagsByCategoryInput,
} from "@portfolio/shared";
import { BaseService } from "../service";
import { tagWithoutRelationsQuery } from "./queries";

export class ListTagsByCategoryService extends BaseService<
  ListTagsByCategoryInput,
  ListTagsOutput
> {
  public async execute(
    input: ListTagsByCategoryInput,
  ): Promise<ListTagsOutput> {
    const { limit, cursor, category: categoryName } = input;
    const cacheKey = `tags:list:${categoryName}:${limit}:${cursor ?? "first"}`;

    return await this.cache.wrap(cacheKey, 3600, async () => {
      const items = await this.db.tag.findMany({
        where: { category: { name: categoryName } },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: "desc" },
        ...tagWithoutRelationsQuery,
      });

      let nextCursor: string | undefined = undefined;

      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items: z.array(TagSchema).parse(items),
        nextCursor,
      };
    });
  }
}
