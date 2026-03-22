import { BaseService } from "../service";
import {
  ExperienceSchema,
  type Experience,
  type UpdateExperienceInput,
} from "@portfolio/shared";
import type { ExperienceUpdating } from "./types";

export class UpdateExperienceService
  extends BaseService
  implements ExperienceUpdating
{
  public async execute(input: UpdateExperienceInput): Promise<Experience> {
    const { id, ...data } = input;

    this.logger.info(`Updating experience: ${id}`);

    const updated = await this.db.experience.update({
      where: { id },
      data,
    });

    await this.invalidateExperienceCache(updated);

    return ExperienceSchema.parse(updated);
  }
}
