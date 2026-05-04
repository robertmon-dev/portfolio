import { Tag } from "@portfolio/shared";
import { BaseService } from "../service";
import { tagWithRelationsQuery } from "./queries";
import { TRPCError } from "@trpc/server";

export class GetTagService extends BaseService {
  public async execute(id: string): Promise<Tag | null> {
    const cacheKey = `tag:id:${id}`;

    return await this.cache.wrap(cacheKey, 3600, async () => {
      const persisted = await this.db.tag.findUnique({
        where: { id: id },
        ...tagWithRelationsQuery,
      });

      if (persisted === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No tag with such ID",
        });
      }

      return persisted;
    });
  }
}
