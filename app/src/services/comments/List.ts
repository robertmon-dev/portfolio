import { z } from "zod";
import { CommentSchema, ListCommentsOutput } from "@portfolio/shared";
import { BaseService } from "../service";
import type { ListCommentsServiceInput } from "./types";
import { commentWithRelationsQuery } from "./queries";

export class ListCommentsService extends BaseService {
  public async execute(
    input: ListCommentsServiceInput,
  ): Promise<ListCommentsOutput> {
    const { limit, cursor, includeDeleted = false } = input;
    const prefix = includeDeleted ? "both" : "";
    const cacheKey = `comments:list:${prefix}:${limit}:${cursor ?? "first"}`;

    return await this.cache.wrap(cacheKey, 3600, async () => {
      const items = await this.db.comment.findMany({
        where: { ...(includeDeleted ? {} : { deletedAt: null }) },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: "desc" },
        ...commentWithRelationsQuery,
      });

      let nextCursor: string | undefined = undefined;

      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items: z.array(CommentSchema).parse(items),
        nextCursor,
      };
    });
  }
}
