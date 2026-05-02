import { Reaction } from "@portfolio/shared";
import { BaseService } from "../service";
import { reactionQueryWithoutRelations } from "./queries";
import { ListingReactionsByComment } from "./types";

export class ListReactionsByCommentService
  extends BaseService
  implements ListingReactionsByComment
{
  public async execute(commentId: string): Promise<Reaction[]> {
    const cacheKey = `reaction:list:comment:id:${commentId}`;

    return this.cache.wrap(cacheKey, 3600, async () => {
      return this.db.reaction.findMany({
        where: { commentId: commentId },
        ...reactionQueryWithoutRelations,
      });
    });
  }
}
