import { BaseService } from "../service";
import { GithubStatsSchema, type GithubStats } from "@portfolio/shared";
import { githubStatsWithDeepRelationsQuery } from "./queries";

export class GetGithubStatsService extends BaseService {
  public async execute(
    username: string = this.settings.NICKNAME,
  ): Promise<GithubStats | null> {
    const cacheKey = `github:stats:${username}`;

    return this.cache.wrap(cacheKey, 3600, async () => {
      this.logger.debug(`Fetching GitHub stats for: ${username} (cache miss)`);

      const stats = await this.db.githubStats.findUnique({
        where: { username },
        ...githubStatsWithDeepRelationsQuery,
      });

      if (!stats) return null;

      return GithubStatsSchema.parse(stats);
    });
  }
}
