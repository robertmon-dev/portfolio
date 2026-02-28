import { BaseService } from '../service';
import { GithubStatsSchema, type GithubStats } from '@portfolio/shared';

export class GetGithubStatsService extends BaseService {
  public async execute(username: string = this.settings.NICKNAME): Promise<GithubStats | null> {
    const cacheKey = `github:stats:${username}`;

    return this.cache.wrap(cacheKey, 3600, async () => {
      this.logger.debug(`Fetching GitHub stats for: ${username} (cache miss)`);

      const stats = await this.db.githubStats.findUnique({
        where: { username },
        include: {
          repos: {
            orderBy: { order: 'asc' },
            include: {
              project: {
                select: {
                  id: true,
                  title: true,
                  slug: true
                }
              }
            }
          }
        }
      });

      if (!stats) return null;

      return GithubStatsSchema.parse(stats);
    });
  }
}
