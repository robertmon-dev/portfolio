import { BaseService } from "../service";
import { TechStackSchema, type TechStack } from "@portfolio/shared";
import type { TechStackProjectLinking } from "./types";
import { techStackWithRelationsQuery } from "./queries";

export class LinkTechStackProjectService
  extends BaseService
  implements TechStackProjectLinking
{
  public async execute(input: {
    techStackId: string;
    projectId: string;
  }): Promise<TechStack> {
    const { techStackId, projectId } = input;

    this.logger.info(
      `Linking TechStack ${techStackId} to project ${projectId}`,
    );

    const updatedTechStack = await this.db.techStack.update({
      where: { id: techStackId },
      data: {
        projects: {
          connect: { id: projectId },
        },
      },
    });

    await Promise.all([
      this.cache.del("projects:list:*"),
      this.cache.del("techstack:list:*"),
      this.cache.del(`project:id:${projectId}:*`),
    ]);

    this.logger.info(
      `Successfully linked TechStack ${techStackId} to project ${projectId}`,
    );

    return TechStackSchema.parse(updatedTechStack);
  }
}
