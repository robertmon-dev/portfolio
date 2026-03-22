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

    const { updated, affectedProjects } = await this.db.$transaction(
      async (tx) => {
        const projects = await tx.project.findMany({
          where: { techStack: { some: { id } } },
          select: { id: true, slug: true },
        });

        const techStack = await tx.techStack.update({
          where: { id },
          data,
        });

        return { updated: techStack, affectedProjects: projects };
      },
    );

    await Promise.all([
      this.invalidateTechStackCache(updated),
      this.invalidateProjectCache(...affectedProjects),
    ]);

    this.logger.info(
      `Tech stack ${id} updated. Invalidated ${affectedProjects.length} projects.`,
    );

    return TechStackSchema.parse(updated);
  }
}
