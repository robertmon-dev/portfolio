import { BaseService } from "../service";
import { type Experience } from "@portfolio/shared";
import type { ExperienceRetrieving } from "./types";

export class GetExperienceService
  extends BaseService
  implements ExperienceRetrieving
{
  public async execute(id: string): Promise<Experience | null> {
    const cacheKey = `experience:id:${id}`;

    return this.cache.wrap(cacheKey, 3600, async () => {
      this.logger.debug(`Fetching Experience: ${id} (cache miss)`);

      const experience = await this.db.experience.findUnique({
        where: { id },
      });

      if (!experience) return null;

      return experience;
    });
  }
}
