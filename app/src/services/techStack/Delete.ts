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

    const techStackKeys = ids.map((id) => `techstack:id:${id}`);
    const projectKeys = affectedProjects.flatMap((p) => [
      `project:id:${p.id}`,
      `project:slug:${p.slug}`,
    ]);

    await Promise.all([
      this.cache.del("techstack:list:*"),
      this.cache.del("projects:list:*"),
      ...techStackKeys.map((key) => this.cache.del(key)),
      ...projectKeys.map((key) => this.cache.del(key)),
    ]);

    this.logger.info(
      `Transaction complete. Deleted stacks and cleared cache for ${affectedProjects.length} projects.`,
    );
  }
}
