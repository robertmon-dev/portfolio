import { AuthorizedBaseService } from "../service";
import { TRPCError } from "@trpc/server";
import { reactionQueryWithRelations } from "./queries";
import { type Reaction } from "@portfolio/shared";
import type { DeletingReactions } from "./types";
import { Comment, Post } from "@prisma/client";

export class DeleteReactionsService
  extends AuthorizedBaseService<string[], Reaction[]>
  implements DeletingReactions
{
  public async execute(ids: string[]): Promise<Reaction[]> {
    const removed = await this.db.$transaction(async (tx) => {
      const actor = this.ctx.user;
      const isStaff = ["ADMIN", "MODERATOR"].includes(actor.role);

      const persisted = await tx.reaction.findMany({
        where: {
          id: { in: ids },
          deletedAt: null,
          authorId: isStaff ? undefined : actor.id,
        },
        select: { id: true },
      });

      if (persisted.length !== ids.length) {
        throw new TRPCError({
          code: "UNPROCESSABLE_CONTENT",
          message:
            "Provided wrong list of reactions, some of them are not persisted",
        });
      }

      const removed = await tx.reaction.updateManyAndReturn({
        where: { id: { in: ids } },
        data: {
          deletedAt: new Date(),
        },
        ...reactionQueryWithRelations,
      });

      return removed;
    });

    const posts = removed.map((r) => r.post).filter(Boolean) as Post[];
    const comments = removed.map((r) => r.comment).filter(Boolean) as Comment[];

    await Promise.all([
      this.cacheInvalidator.invalidatePostCache(...posts),
      this.cacheInvalidator.invalidateCommentsCache(...comments),
      this.cacheInvalidator.invalidateReactionsCache(...removed),
    ]);

    return removed;
  }
}
