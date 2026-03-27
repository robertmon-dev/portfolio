import { BaseService } from "../service";
import { type Experience } from "@portfolio/shared";
import type { ExperienceListing } from "./types";

export class ListExperienceService
  extends BaseService
  implements ExperienceListing
{
  public async execute(): Promise<Experience[]> {
    const cacheKey = `experience:list:all`;

    return this.cache.wrap(cacheKey, 3600, async () => {
      this.logger.debug("Fetching experiences from database (cache miss)");

      const items = await this.db.experience.findMany({
        orderBy: { startDate: "desc" },
      });

      return items;
    });
  }
}
