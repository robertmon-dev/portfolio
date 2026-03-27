import { BaseService } from "../service";
import type { GithubRepo } from "@portfolio/shared";

export class ListGithubReposService extends BaseService {
  public async execute(): Promise<GithubRepo[]> {
    const cacheKey = "github:repos:list:all";

    return this.cache.wrap(cacheKey, 3600, async () => {
      this.logger.debug("Fetching github repos from database (cache miss)");

      const repos = await this.db.githubRepo.findMany({
        orderBy: {
          stars: "desc",
        },
        include: {
          project: true,
        },
      });

      return repos;
    });
  }
}
