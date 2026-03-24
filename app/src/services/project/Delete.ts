import { BaseService } from "../service";
import {
  type ProjectWithRelations,
  ProjectWithRelationsSchema,
} from "@portfolio/shared";
import type { ProjectDeleting } from "./types";
import { projectWithRelationsQuery } from "./queries";

export class DeleteProjectService
  extends BaseService
  implements ProjectDeleting
{
  public async execute(id: string): Promise<ProjectWithRelations> {
    this.logger.warn(`Attempting to delete project: ${id}`);

    const deletedProject = await this.db.project.delete({
      where: { id },
      ...projectWithRelationsQuery,
    });

    await Promise.all([
      this.invalidateProjectCache(deletedProject),
      this.invalidateTechStackCache(...deletedProject.techStack),
    ]);

    this.logger.info(
      `Project deleted and cache invalidated: ${deletedProject.slug}`,
    );

    return ProjectWithRelationsSchema.parse(deletedProject);
  }
}
