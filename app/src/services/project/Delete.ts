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
      await this.cache.del(`project:slug:${deletedProject.slug}`),
      await this.cache.del("projects:list:*"),
      await this.cache.del(`projects:id:${id}`),
    ]);

    this.logger.info(`Project deleted successfully: ${deletedProject.slug}`);
    return deletedProject;
  }
}
