import { BaseService } from "../service";
import { type Experience, type CreateExperienceInput } from "@portfolio/shared";
import type { ExperienceCreating } from "./types";

export class CreateExperienceService
  extends BaseService<CreateExperienceInput, Experience>
  implements ExperienceCreating
{
  public async execute(data: CreateExperienceInput): Promise<Experience> {
    this.logger.info(`Creating experience at: ${data.company}`);

    const created = await this.db.experience.create({
      data,
    });

    await this.cacheInvalidator.invalidateExperienceCache(created);

    return created;
  }
}
