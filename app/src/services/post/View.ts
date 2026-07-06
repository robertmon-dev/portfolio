import { BaseService } from "../service";

const VIEW_TTL_SECONDS = 3600;

export class ViewPostService extends BaseService<string, void> {
  public async execute(postId: string): Promise<void> {
    const ip = this.ctx?.ip ?? "unknown";
    const dedupeKey = `post:view:${postId}:${ip}`;

    const alreadyCounted = await this.cache.get(dedupeKey);
    if (alreadyCounted) return;

    await this.db.post.update({
      where: { id: postId, deletedAt: null },
      data: { viewCount: { increment: 1 } },
    });

    await this.cache.set(dedupeKey, true, VIEW_TTL_SECONDS);
    await this.cacheInvalidator.invalidatePostCache({ id: postId });
  }
}
