import z from "zod";
import { BaseService } from "../service";
import { ListReactionsOutput, ReactionSchema } from "@portfolio/shared";
import type { ListingReactions, ListReactionsServiceInput } from "./types";
import { reactionQueryWithoutRelations } from "./queries";

export class ListReactionsService
  extends BaseService<ListReactionsServiceInput, ListReactionsOutput>
  implements ListingReactions
{
  public async execute(
    input: ListReactionsServiceInput,
  ): Promise<ListReactionsOutput> {
    const { limit, cursor, includeDeleted } = input;
    const prefix = includeDeleted ? "both" : "";
    const cacheKey = `reaction:list:${prefix}:${limit}:${cursor ?? "first"}`;

    return await this.cache.wrap(cacheKey, 3600, async () => {
      const items = await this.db.reaction.findMany({
        where: { ...(includeDeleted ? {} : { deletedAt: null }) },
        take: limit + 1,
        skip: cursor ? 1 : undefined,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: "desc" },
        ...reactionQueryWithoutRelations,
      });

      let nextCursor: string | undefined = undefined;

      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items: z.array(ReactionSchema).parse(items),
        nextCursor,
      };
    });
  }
}
