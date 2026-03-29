import { BaseService } from "../service";
import {
  type CreateProjectInput,
  type ProjectWithRelations,
  ProjectWithRelationsSchema,
} from "@portfolio/shared";
import { ProjectCreating } from "./types";
import { projectWithRelationsQuery } from "./queries";

export class CreateProjectService
  extends BaseService
  implements ProjectCreating
{
  public async execute(
    data: CreateProjectInput,
  ): Promise<ProjectWithRelations> {
    this.logger.info(`Creating project: ${data.title}`);

    const { techStackIds, githubRepoId, ...rest } = data;
    const project = await this.db.project.create({
      data: {
        ...rest,
        techStack: techStackIds
          ? {
              connect: techStackIds.map((id) => ({ id })),
            }
          : undefined,
        githubRepo: githubRepoId
          ? {
              connect: { id: githubRepoId },
            }
          : undefined,
      },
      ...projectWithRelationsQuery,
    });

    await this.invalidateProjectCache(project);

    return ProjectWithRelationsSchema.parse(project);
  }
}
