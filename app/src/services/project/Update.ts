import { BaseService } from "../service";
import { UpdateProjectInput, ProjectWithRelations } from "@portfolio/shared";
import { ProjectUpdating } from "./types";
import { projectWithRelationsQuery } from "./queries";

export class UpdateProjectService
  extends BaseService
  implements ProjectUpdating
{
  public async execute(
    input: UpdateProjectInput,
  ): Promise<ProjectWithRelations> {
    const { id, techStackIds, githubRepoId, ...rest } = input;

    this.logger.info(`Updating project: ${id}`);

    const project = await this.db.project.update({
      where: { id },
      data: {
        ...rest,
        techStack: techStackIds
          ? {
              set: techStackIds.map((techId) => ({ id: techId })),
            }
          : undefined,
        githubRepo:
          githubRepoId === null
            ? { disconnect: true }
            : githubRepoId
              ? { connect: { id: githubRepoId } }
              : undefined,
        ...projectWithRelationsQuery,
      },
    });

    await Promise.all([
      this.cache.del(`project:slug:${project.slug}`),
      this.cache.del("projects:list:*"),
      this.cache.del(`projects:id:${id}`),
    ]);

    return project;
  }
}
