import { BaseService } from "../service";
import { ReactionSchema, type Reaction } from "@portfolio/shared";
import { reactionQueryWithRelations } from "./queries";
import type { FetchingReactions } from "./types";

export class GetReactionService
  extends BaseService
  implements FetchingReactions
{
  public async execute(id: string): Promise<Reaction> {
    const cacheKey = `reactions:id:${id}`;

    return this.cache.wrap(cacheKey, 3600, async () => {
      const reaction = await this.db.reaction.findFirst({
        where: { id: id },
        ...reactionQueryWithRelations,
      });

      return ReactionSchema.parse(reaction);
    });
  }
}
