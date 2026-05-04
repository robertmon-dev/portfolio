import { AuthorizedBaseService } from "../service";
import {
  type CommentWithReplies,
  CommentSchema,
  type CreateCommentInput,
} from "@portfolio/shared";
import { commentWithRelationsQuery } from "./queries";

export class CreateCommentService extends AuthorizedBaseService {
  public async execute(input: CreateCommentInput): Promise<CommentWithReplies> {
    const authorId = this.ctx.user.id;
    const { parentId, postId, ...rest } = input;

    const created = await this.db.comment.create({
      data: {
        ...rest,
        author: { connect: { id: authorId } },
        parent: parentId ? { connect: { id: parentId } } : undefined,
        post: { connect: { id: postId } },
      },
      ...commentWithRelationsQuery,
    });

    this.invalidateCommentsCache(created);
    this.invalidatePostCache(created.post);

    return CommentSchema.parse(created);
  }
}
