import { BaseService } from '../service';
import type { Prisma, GithubRepo } from '@prisma/client';

export class UpdateGithubRepoService extends BaseService {
  public async execute(input: { id: string; data: Prisma.GithubRepoUpdateInput }): Promise<GithubRepo> {
    const { id, data } = input;

    this.logger.info(`Updating repo: ${id}`);

    const updated = await this.db.githubRepo.update({
      where: { id },
      data
    });

    await this.cache.del('projects:list:*');
    await this.cache.del('github:stats:*');

    return updated;
  }
}
