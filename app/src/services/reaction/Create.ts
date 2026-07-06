import { AuthorizedBaseService } from "../service";
import type { CreateReactionInput, Reaction } from "@portfolio/shared";
import type { CreatingReactions } from "./types";

export class CreateReactionService
  extends AuthorizedBaseService<CreateReactionInput, Reaction>
  implements CreatingReactions
{
  public async execute(input: CreateReactionInput): Promise<Reaction> {
    const authorId = this.ctx.user.id;
    const { postId, commentId, type } = input;

    const upserted = await this.db.reaction.upsert({
      where: {
        authorId_postId: postId !== null ? { authorId, postId } : undefined,
        authorId_commentId:
          commentId !== null ? { authorId, commentId } : undefined,
      },
      update: { type, deletedAt: null },
      create: { authorId, postId, commentId, type },
      include: {
        post: !!postId,
        comment: !!commentId,
      },
    });

    await Promise.all([
      postId !== null
        ? this.cacheInvalidator.invalidatePostCache(upserted.post)
        : this.cacheInvalidator.invalidateCommentsCache(upserted.comment),
      this.cacheInvalidator.invalidateReactionsCache(upserted),
    ]);

    this.logger.info(`Upserted new reaction for user with ID: ${authorId}`);

    return upserted;
  }
}
