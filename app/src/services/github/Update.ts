import { BaseService } from '../service';
import type { GithubRepo } from '@prisma/client';
import type { UpdateGithubRepoInput } from '@portfolio/shared';

export class UpdateGithubRepoService extends BaseService {
  public async execute(input: { id: string; data: UpdateGithubRepoInput }): Promise<GithubRepo> {
    const { id, data } = input;

    this.logger.info(`Updating repo: ${id}`);

    const updated = await this.db.githubRepo.update({
      where: { id },
      data
    });

    await this.cache.del('projects:list:*');
    await this.cache.del('github:stats:*');
    await this.cache.del('github:repos:*');

    return updated;
  }
}
