import { BaseService } from '../service';

export class LinkRepoProjectService extends BaseService {
  public async execute(repoId: string, projectId: string) {
    this.logger.info(`Linking repo ${repoId} to project ${projectId}`);

    const updatedRepo = await this.db.githubRepo.update({
      where: { id: repoId },
      data: {
        project: {
          connect: { id: projectId }
        }
      }
    });

    await Promise.all([
      this.cache.del('projects:list:*'),
      this.cache.del('github:repos:list:all'),
      this.cache.del(`project:id:${projectId}:*`)
    ]);

    this.logger.info(`Successfully linked repo ${repoId} to project ${projectId}`);

    return updatedRepo;
  }
}
