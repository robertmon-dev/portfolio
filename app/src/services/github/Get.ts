import { BaseService } from '../service';

export class GetGithubStatsService extends BaseService {
  public async execute(username: string = this.settings.NICKNAME) {
    const cacheKey = `github:stats:${username}`;

    return this.cache.wrap(cacheKey, 3600, async () => {
      this.logger.debug(`Fetching GitHub stats for: ${username} (cache miss)`);

      return await this.db.githubStats.findUnique({
        where: { username },
        include: {
          repos: {
            orderBy: { order: 'asc' },
            include: {
              project: {
                select: {
                  slug: true,
                  title: true
                }
              }
            }
          }
        }
      });
    });
  }
}
