import { type Reaction, type UpdateReactionInput } from "@portfolio/shared";
import { AuthorizedBaseService } from "../service";
import { TRPCError } from "@trpc/server";
import { reactionQueryWithRelations } from "./queries";
import { UpdatingReactions } from "./types";

export class UpdateReactionService
  extends AuthorizedBaseService<UpdateReactionInput, Reaction>
  implements UpdatingReactions
{
  public async execute(input: UpdateReactionInput): Promise<Reaction> {
    const { id: reactionId, postId, commentId, ...rest } = input;

    const actor = this.ctx.user;
    const isStaff = ["ADMIN", "MODERATOR"].includes(actor.role);

    const updated = await this.db.$transaction(async (tx) => {
      const persisted = await tx.reaction.findUnique({
        where: {
          id: reactionId,
          authorId: isStaff ? actor.id : undefined,
        },
      });

      if (persisted === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "reaction with such ID has not been found",
        });
      }

      return await tx.reaction.update({
        where: {
          id: reactionId,
        },
        data: {
          ...rest,
        },
        ...reactionQueryWithRelations,
      });
    });

    await Promise.all([
      updated.post
        ? this.cacheInvalidator.invalidatePostCache(updated.post)
        : this.cacheInvalidator.invalidateCommentsCache(updated.comment),
      this.cacheInvalidator.invalidateReactionsCache(updated),
    ]);

    return updated;
  }
}
