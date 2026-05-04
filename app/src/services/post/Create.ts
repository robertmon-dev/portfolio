import { AuthorizedBaseService } from "../service";
import { type CreatePostInput, PostSchema } from "@portfolio/shared";
import type { Post } from "@portfolio/shared";
import { postWithRelationsQuery } from "./queries";
import type { CreatingPosts } from "./types";

export class CreatePostService
  extends AuthorizedBaseService
  implements CreatingPosts
{
  public async execute(input: CreatePostInput): Promise<Post> {
    const { id: userId } = this.ctx.user;
    const { tagIds, ...rest } = input;

    const post = await this.db.post.create({
      data: {
        ...rest,
        author: { connect: { id: userId } },
        tags: tagIds
          ? {
              connect: tagIds.map((id) => ({ id })),
            }
          : undefined,
      },
      ...postWithRelationsQuery,
    });

    return PostSchema.parse(post);
  }
}
