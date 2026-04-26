import { z } from "zod";
import { BaseService } from "../service";
import { PostSchema, ListPostsOutput } from "@portfolio/shared";
import { postWithRelationsQuery } from "./queries";
import type { ListPostsServiceInput } from "./types";

export class ListPostsService extends BaseService {
  public async execute(input: ListPostsServiceInput): Promise<ListPostsOutput> {
    const { limit, cursor, includeDeleted = false } = input;
    const cacheKey = `posts:list:${limit}:${cursor ?? "first"}`;

    return await this.cache.wrap(cacheKey, 3600, async () => {
      return this.db.$transaction(async (tx) => {
        const items = await tx.post.findMany({
          where: { ...(includeDeleted ? {} : { deletedAt: null }) },
          take: limit + 1,
          cursor: cursor ? { id: cursor } : undefined,
          orderBy: { createdAt: "desc" },
          ...postWithRelationsQuery,
        });

        let nextCursor: string | undefined = undefined;

        if (items.length > limit) {
          const nextItem = items.pop();
          nextCursor = nextItem!.id;
        }

        return {
          items: z.array(PostSchema).parse(items),
          nextCursor,
        };
      });
    });
  }
}
