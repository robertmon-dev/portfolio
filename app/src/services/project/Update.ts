import { BaseService } from '../service';
import { UpdateProjectInput, ProjectWithRelations } from '@portfolio/shared';
import { ProjectUpdating } from './types';

export class UpdateProjectService extends BaseService implements ProjectUpdating {
  public async execute(id: string, data: UpdateProjectInput): Promise<ProjectWithRelations> {
    this.logger.info(`Updating project: ${id}`);

    const { techStackIds, githubRepoId, ...rest } = data;
    const project = await this.db.project.update({
      where: { id },
      data: {
        ...rest,
        techStack: techStackIds ? {
          set: techStackIds.map(id => ({ id }))
        } : undefined,
        githubRepo: githubRepoId === null
          ? { disconnect: true }
          : githubRepoId
            ? { connect: { id: githubRepoId } }
            : undefined
      },
      include: { techStack: true, githubRepo: true, gallery: true }
    });

    await this.cache.del(`project:slug:${project.slug}`);
    await this.cache.del('projects:list:*');

    return project;
  }
}
