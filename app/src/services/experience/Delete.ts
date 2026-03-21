import { BaseService } from "../service";
import type { ExperienceDeleting } from "./types";

export class DeleteExperienceService
  extends BaseService
  implements ExperienceDeleting
{
  public async execute(ids: string[]): Promise<void> {
    this.logger.warn(
      `Attempting to hard-delete Experiences: ${ids.join(", ")}`,
    );

    const result = await this.db.experience.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    const individualCacheKeys = ids.map((id) => `experience:id:${id}`);

    await Promise.all([
      this.cache.del("experience:list:*"),
      ...individualCacheKeys.map((key) => this.cache.del(key)),
    ]);

    this.logger.info(
      `Successfully hard-deleted ${result.count} Experience(s) and invalidated cache.`,
    );
  }
}
