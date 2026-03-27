import { BaseService } from "../service";
import { type TechStack, type CreateTechStackInput } from "@portfolio/shared";
import type { TechStackCreating } from "./types";

export class CreateTechStackService
  extends BaseService
  implements TechStackCreating
{
  public async execute(data: CreateTechStackInput): Promise<TechStack> {
    this.logger.info(`Creating tech stack: ${data.name}`);

    const created = await this.db.techStack.create({
      data,
    });

    await this.invalidateTechStackCache(created);

    return created;
  }
}
