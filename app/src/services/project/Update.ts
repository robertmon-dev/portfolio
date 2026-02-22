import { BaseService } from '../service';
import { UpdateProjectInput, ProjectWithRelations } from '@portfolio/shared';
import { ProjectUpdating } from './types';

export class UpdateProjectService extends BaseService implements ProjectUpdating {
  public async execute(input: { id: string; data: UpdateProjectInput }): Promise<ProjectWithRelations> {
    const { id, data } = input;

    this.logger.info(`Updating project: ${id}`);

    const { techStackIds, githubRepoId, ...rest } = data;

    const project = await this.db.project.update({
      where: { id },
      data: {
        ...rest,
        techStack: techStackIds ? {
          set: techStackIds.map(techId => ({ id: techId }))
        } : undefined,
        githubRepo: githubRepoId === null
          ? { disconnect: true }
          : githubRepoId
            ? { connect: { id: githubRepoId } }
            : undefined
      },
      include: { techStack: true, githubRepo: true, gallery: true }
    });

    await Promise.all([
      this.cache.del(`project:slug:${project.slug}`),
      this.cache.del('projects:list:*')
    ]);

    return project;
  }
}
