import { BaseService } from "../service";
import {
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

    const { updatedTechStack, project } = await this.db.$transaction(
      async (tx) => {
        const p = await tx.project.findUniqueOrThrow({
          where: { id: projectId },
          select: { slug: true },
        });

        const updated = await tx.techStack.update({
          where: { id: techStackId },
          data: { projects: { disconnect: { id: projectId } } },
        });

        return { updatedTechStack: updated, project: p };
      },
    );

    await Promise.all([
      this.invalidateTechStackCache(updatedTechStack),
      this.invalidateProjectCache({ id: projectId, slug: project.slug }),
    ]);

    this.logger.info(
      `Successfully unlinked TechStack ${techStackId} from project ${projectId}`,
    );

    return updatedTechStack;
  }
}
