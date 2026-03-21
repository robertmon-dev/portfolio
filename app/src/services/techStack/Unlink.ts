import { BaseService } from "../service";
import {
  TechStackSchema,
  type TechStack,
  type LinkTechStackProjectInput,
} from "@portfolio/shared";
import type { TechStackProjectLinking } from "./types";

export class UnlinkTechStackProjectService
  extends BaseService
  implements TechStackProjectLinking
{
  public async execute(input: LinkTechStackProjectInput): Promise<TechStack> {
    const { techStackId, projectId } = input;

    this.logger.info(
      `Unlinking TechStack ${techStackId} from project ${projectId}`,
    );

    const updatedTechStack = await this.db.techStack.update({
      where: { id: techStackId },
      data: {
        projects: {
          disconnect: { id: projectId },
        },
      },
    });

    await Promise.all([
      this.cache.del("projects:list:*"),
      this.cache.del("techstack:list:*"),
      this.cache.del(`project:id:${projectId}:*`),
    ]);

    this.logger.info(
      `Successfully unlinked TechStack ${techStackId} from project ${projectId}`,
    );

    return TechStackSchema.parse(updatedTechStack);
  }
}
