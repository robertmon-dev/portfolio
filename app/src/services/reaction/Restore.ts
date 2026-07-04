import { z } from "zod";
import { Reaction, ReactionSchema } from "@portfolio/shared";
import { BaseService } from "../service";
import { reactionQueryWithRelations } from "./queries";
import type { RestoringReactions } from "./types";
import { TRPCError } from "@trpc/server";

export class RestoreReactionsService
  extends BaseService<string[], Reaction[]>
  implements RestoringReactions
{
  public async execute(reactionIds: string[]): Promise<Reaction[]> {
    return await this.db.$transaction(async (tx) => {
      const persisted = await tx.reaction.findMany({
        where: { id: { in: reactionIds } },
      });

      if (persisted.length !== reactionIds.length) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Some of the provided reactions are not present in storage",
        });
      }

      await tx.reaction.updateMany({
        where: { id: { in: reactionIds } },
        data: { deletedAt: null },
      });

      const restored = await tx.reaction.findMany({
        where: { id: { in: reactionIds } },
        ...reactionQueryWithRelations,
      });

      const posts = restored
        .map((reaction) => reaction.post)
        .filter((post): post is NonNullable<typeof post> => Boolean(post));

      const comments = restored
        .map((reaction) => reaction.comment)
        .filter((comment): comment is NonNullable<typeof comment> =>
          Boolean(comment),
        );

      await Promise.all([
        this.cacheInvalidator.invalidateCommentsCache(...comments),
        this.cacheInvalidator.invalidatePostCache(...posts),
        this.cacheInvalidator.invalidateReactionsCache(...restored),
      ]);

      return z.array(ReactionSchema).parse(restored);
    });
  }
}
