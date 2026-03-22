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

    const projectKeys = affectedProjects.flatMap((p) => [
      `project:id:${p.id}`,
      `project:slug:${p.slug}`,
    ]);

    await Promise.all([
      this.cache.del("techstack:list:*"),
      this.cache.del(`techstack:id:${id}`),
      this.cache.del("projects:list:*"),
      ...projectKeys.map((key) => this.cache.del(key)),
    ]);

    return TechStackSchema.parse(updated);
  }
}
