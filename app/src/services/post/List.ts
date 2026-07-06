import { z } from "zod";
import { BaseService } from "../service";
import { PostSchema, ListPostsOutput } from "@portfolio/shared";
import {
  postWithRelationsQuery,
  mapPostRelations,
  postWithEternalRelationsQuery,
  PostWithRelationsRow,
} from "./queries";
import type { ListPostsServiceInput, ListingPosts } from "./types";

export class ListPostsService
  extends BaseService<ListPostsServiceInput, ListPostsOutput>
  implements ListingPosts
{
  public async execute(input: ListPostsServiceInput): Promise<ListPostsOutput> {
    const { limit, cursor, includeDeleted } = input;
    const prefix = includeDeleted ? "both" : "";
    const cacheKey = `posts:list:${prefix}:${limit}:${cursor ?? "first"}`;

    return await this.cache.wrap(cacheKey, 3600, async () => {
      const baseArgs = {
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: "desc" as const },
      };

      const items = includeDeleted
        ? await this.db.post.findMany({
            ...baseArgs,
            where: {},
            ...postWithEternalRelationsQuery,
          })
        : await this.db.post.findMany({
            ...baseArgs,
            where: { deletedAt: null },
            ...postWithRelationsQuery,
          });

      let nextCursor: string | undefined = undefined;

      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items: z
          .array(PostSchema)
          .parse((items as PostWithRelationsRow[]).map(mapPostRelations)),
        nextCursor,
      };
    });
  }
}
