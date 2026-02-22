import { BaseService } from '../service';

export class DeleteGithubRepoService extends BaseService {
  public async execute(id: string): Promise<void> {
    this.logger.warn(`Attempting to remove GitHub repo: ${id}`);

    try {
      await this.db.githubRepo.delete({
        where: { id }
      });

      await Promise.all([
        this.cache.del('github:repos:list:all'),
        this.cache.del('github:stats:*'),
        this.cache.del('projects:list:*')
      ]);

      this.logger.info(`GitHub repo ${id} removed successfully and cache invalidated.`);
    } catch (error) {
      this.logger.error(`Failed to remove repo ${id}. It might have been already deleted or does not exist.`, error);
      throw error;
    }
  }
}
