import { BaseService } from "../service";
import type { TechStackDeleting } from "./types";

export class DeleteTechStackService
  extends BaseService
  implements TechStackDeleting
{
  public async execute(ids: string[]): Promise<void> {
    this.logger.warn(`Atomic hard-delete for Tech Stacks: ${ids.join(", ")}`);

    const affectedProjects = await this.db.$transaction(async (tx) => {
      const projects = await tx.project.findMany({
        where: {
          techStack: {
            some: { id: { in: ids } },
          },
        },
        select: { id: true, slug: true },
      });

      await tx.techStack.deleteMany({
        where: {
          id: { in: ids },
        },
      });

      return projects;
    });

    await Promise.all([
      this.invalidateTechStackCache(...ids.map((id) => ({ id }))),
      this.invalidateProjectCache(...affectedProjects),
    ]);

    this.logger.info(
      `Transaction complete. Deleted stacks and cleared cache for ${affectedProjects.length} projects.`,
    );
  }
}
