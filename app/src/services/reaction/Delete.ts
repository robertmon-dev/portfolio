import { AuthorizedBaseService } from "../service";
import { TRPCError } from "@trpc/server";
import { reactionQueryWithoutRelations } from "./queries";
import { type Reaction } from "@portfolio/shared";
import type { DeletingReactions } from "./types";

export class DeleteReactionsService
  extends AuthorizedBaseService
  implements DeletingReactions
{
  public async execute(ids: string[]): Promise<Reaction[]> {
    return await this.db.$transaction(async (tx) => {
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
        ...reactionQueryWithoutRelations,
      });

      return removed;
    });
  }
}
