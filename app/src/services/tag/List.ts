import z from "zod";
import {
  type ListTagsOutput,
  type ListTagsInput,
  TagSchema,
} from "@portfolio/shared";
import { BaseService } from "../service";
import { tagWithoutRelationsQuery } from "./queries";

export class ListTagsService extends BaseService<
  ListTagsInput,
  ListTagsOutput
> {
  public async execute(input: ListTagsInput): Promise<ListTagsOutput> {
    const { limit, cursor } = input;
    const cacheKey = `tags:list:${limit}:${cursor ?? "first"}`;

    return await this.cache.wrap(cacheKey, 3600, async () => {
      const items = await this.db.tag.findMany({
        take: limit + 1,
        skip: cursor ? 1 : undefined,
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
