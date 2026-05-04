import { Reaction } from "@portfolio/shared";
import { BaseService } from "../service";
import { reactionQueryWithoutRelations } from "./queries";
import type { ListingReactionsByPost } from "./types";

export class ListReactionsByPostService
  extends BaseService
  implements ListingReactionsByPost
{
  public async execute(postId: string): Promise<Reaction[]> {
    const cacheKey = `reaction:list:post:id:${postId}`;

    return this.cache.wrap(cacheKey, 3600, async () => {
      return this.db.reaction.findMany({
        where: { postId: postId },
        ...reactionQueryWithoutRelations,
      });
    });
  }
}
