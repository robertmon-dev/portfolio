import { BaseService } from "../service";
import { ProjectWithRelations } from "@portfolio/shared";
import { ProjectDeleting } from "./types";
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

    return deletedProject;
  }
}
