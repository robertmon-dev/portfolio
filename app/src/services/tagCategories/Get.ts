import { TagCategory } from "@portfolio/shared";
import { BaseService } from "../service";
import { tagCategoryWithRelationsQuery } from "./queries";
import { TRPCError } from "@trpc/server";

export class GetTagCategoriesService extends BaseService {
  public async execute(id: string): Promise<TagCategory> {
    const cacheKey = `category:id:${id}`;

    return await this.cache.wrap(cacheKey, 3600, async () => {
      const persisted = await this.db.tagCategory.findUnique({
        where: { id: id },
        ...tagCategoryWithRelationsQuery,
      });

      if (persisted === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: " No such tag category",
        });
      }

      return persisted;
    });
  }
}
