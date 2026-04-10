import { type GithubCommit, GithubCommitSchema } from "@portfolio/shared";
import { BaseService } from "../service";
import type { CommitRetrieving } from "./types";

export class GetCommitService extends BaseService implements CommitRetrieving {
  execute(id: string): Promise<GithubCommit | null> {
    const cacheKey = `githubCommit:id:${id}`;

    return this.cache.wrap(cacheKey, 3600, async () => {
      this.logger.debug(`Fetching commit: ${id} (cache miss)`);

      const githubCommit = await this.db.githubCommit.findUnique({
        where: { id },
      });

      if (!githubCommit) return null;

      return GithubCommitSchema.parse(githubCommit);
    });
  }
}
