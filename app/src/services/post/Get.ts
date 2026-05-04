import { Post, PostSchema } from "@portfolio/shared";
import { BaseService } from "../service";
import { postWithRelationsQuery } from "./queries";
import type { FetchingPosts } from "./types";

export class GetPostService extends BaseService implements FetchingPosts {
  public async execute(postId: string): Promise<Post> {
    const cacheKey = `post:id:${postId}`;

    return await this.cache.wrap(cacheKey, 3600, async () => {
      const persisted = await this.db.post.findUnique({
        where: { id: postId, deletedAt: null },
        ...postWithRelationsQuery,
      });

      return PostSchema.parse(persisted);
    });
  }
}
