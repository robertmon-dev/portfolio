import z from "zod";
import { type GithubCommit, GithubCommitSchema } from "@portfolio/shared";
import { BaseService } from "../service";
import { CommitsListing } from "./types";

export class ListCommitsService extends BaseService implements CommitsListing {
  execute(): Promise<GithubCommit[]> {
    const cacheKey = `githubCommit:list:all`;

    return this.cache.wrap(cacheKey, 3600, async () => {
      this.logger.debug("Fetching commits from database (cache miss)");

      const items = await this.db.githubCommit.findMany({
        orderBy: { date: "desc" },
      });

      return z.array(GithubCommitSchema).parse(items);
    });
  }
}
