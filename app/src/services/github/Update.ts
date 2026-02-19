import { Database } from '../../core/database/database';
import { Logger } from '../../core/logger/logger';
import type { Prisma, GithubRepo } from '@prisma/client';

export class UpdateGithubRepoService {
  private db = Database.getInstance();
  private logger = new Logger('UpdateGithubRepoService');

  public async execute(id: string, data: Prisma.GithubRepoUpdateInput): Promise<GithubRepo> {
    this.logger.info(`Updating repo: ${id}`);

    return await this.db.client.githubRepo.update({
      where: { id },
      data
    });
  }
}
