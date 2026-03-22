import { BaseService } from "../service";
import { TechStackSchema, type TechStack } from "@portfolio/shared";
import type { TechStackProjectLinking } from "./types";

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

    const { updatedTechStack, project } = await this.db.$transaction(
      async (tx) => {
        const p = await tx.project.findUniqueOrThrow({
          where: { id: projectId },
          select: { slug: true },
        });

        const updated = await tx.techStack.update({
          where: { id: techStackId },
          data: { projects: { connect: { id: projectId } } },
        });

        return { updatedTechStack: updated, project: p };
      },
    );

    await Promise.all([
      this.invalidateTechStackCache(updatedTechStack),
      this.invalidateProjectCache({ id: projectId, slug: project.slug }),
    ]);

    this.logger.info(
      `Successfully linked TechStack ${techStackId} to project ${projectId}`,
    );

    return TechStackSchema.parse(updatedTechStack);
  }
}
