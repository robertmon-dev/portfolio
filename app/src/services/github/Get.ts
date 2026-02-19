import { Database } from '../../core/database/database';
import { Logger } from '../../core/logger/logger';
import { Settings } from '../../core/settings/settings';

export class GetGithubStatsService {
  private db = Database.getInstance();
  private logger = new Logger('GetGithubStatsService');
  private defaultUsername = Settings.getInstance().config.NICKNAME;

  public async execute(username: string = this.defaultUsername) {
    this.logger.debug(`Fetching stats for: ${username}`);

    return await this.db.client.githubStats.findUnique({
      where: { username },
      include: {
        repos: {
          orderBy: { order: 'asc' },
          include: {
            project: { select: { slug: true, title: true } }
          }
        }
      }
    });
  }
}
