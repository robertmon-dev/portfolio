import { BaseService } from "../service";
import {
  TechStackSchema,
  type TechStack,
  type UpdateTechStackInput,
} from "@portfolio/shared";
import type { TechStackUpdating } from "./types";

export class UpdateTechStackService
  extends BaseService
  implements TechStackUpdating
{
  public async execute(input: UpdateTechStackInput): Promise<TechStack> {
    const { id, ...data } = input;

    this.logger.info(`Updating tech stack: ${id}`);

    const updated = await this.db.techStack.update({
      where: { id },
      data,
    });

    await Promise.all([
      this.cache.del("techstack:list:*"),
      this.cache.del("projects:list:*"),
    ]);

    return TechStackSchema.parse(updated);
  }
}
