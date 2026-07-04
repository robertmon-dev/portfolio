import { AuthorizedBaseService } from "../service";
import { type CreatePostInput, PostSchema } from "@portfolio/shared";
import type { Post } from "@portfolio/shared";
import { postWithRelationsQuery, mapPostRelations } from "./queries";
import type { CreatingPosts } from "./types";

export class CreatePostService
  extends AuthorizedBaseService<CreatePostInput, Post>
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

    await this.cacheInvalidator.invalidatePostCache(post);

    return PostSchema.parse(mapPostRelations(post));
  }
}
