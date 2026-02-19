import { Database } from '../../core/database/database';
import { Logger } from '../../core/logger/logger';

export class DeleteGithubRepoService {
  private db = Database.getInstance();
  private logger = new Logger('RemoveGithubRepoService');

  public async execute(id: string): Promise<void> {
    this.logger.info(`Removing repo: ${id}`);

    try {
      await this.db.client.githubRepo.delete({
        where: { id }
      });
    } catch (error) {
      this.logger.warn(`Failed to remove repo ${id} (maybe already deleted?)`);
      throw error;
    }
  }
}
