import { Database } from '../../core/database/database';
import { Logger } from '../../core/logger/logger';

export class LinkRepoProjectService {
  private db = Database.getInstance();
  private logger = new Logger('LinkRepoProjectService');

  public async execute(repoId: string, projectId: string) {
    this.logger.info(`Linking repo ${repoId} to project ${projectId}`);

    return await this.db.client.githubRepo.update({
      where: { id: repoId },
      data: {
        project: { connect: { id: projectId } }
      }
    });
  }
}
