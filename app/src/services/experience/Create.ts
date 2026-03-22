import { BaseService } from "../service";
import {
  ExperienceSchema,
  type Experience,
  type CreateExperienceInput,
} from "@portfolio/shared";
import type { ExperienceCreating } from "./types";

export class CreateExperienceService
  extends BaseService
  implements ExperienceCreating
{
  public async execute(data: CreateExperienceInput): Promise<Experience> {
    this.logger.info(`Creating experience at: ${data.company}`);

    const created = await this.db.experience.create({
      data,
    });

    await this.invalidateExperienceCache(created);

    return ExperienceSchema.parse(created);
  }
}
