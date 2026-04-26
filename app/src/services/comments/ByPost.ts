import { z } from "zod";
import { BaseService } from "../service";
import { commentWithRelationsQuery } from "./queries";
import { CommentSchema, ListCommentsOutput } from "@portfolio/shared";
import { ListCommentsByPostServiceInput } from "./types";

export class ListCommentsByPostService extends BaseService {
  public async execute(
    input: ListCommentsByPostServiceInput,
  ): Promise<ListCommentsOutput> {
    const { limit, cursor, postId, includeDeleted = false } = input;
    const prefix = includeDeleted ? "both" : "";
    const cacheKey = `comments:list:post${prefix}:${limit}:${cursor ?? "first"}`;

    return await this.cache.wrap(cacheKey, 3600, async () => {
      const items = await this.db.comment.findMany({
        where: {
          ...(includeDeleted ? {} : { deletedAt: null }),
          postId: postId,
        },
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
