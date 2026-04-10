import { z } from "zod";
import {
  GithubCommitSchema,
  type ListCommitsInput,
  type ListCommitsOutput,
} from "@portfolio/shared";
import { BaseService } from "../service";
import { CommitsListing } from "./types";
import { githubCommitWithRelationsQuery } from "./queries";

export class ListCommitsService extends BaseService implements CommitsListing {
  public async execute(input: ListCommitsInput): Promise<ListCommitsOutput> {
    const { limit, cursor } = input;

    const cacheKey = `githubCommit:list:${limit}:${cursor ?? "first"}`;

    return this.cache.wrap(cacheKey, 3600, async () => {
      this.logger.debug(
        `Fetching commits from database (cursor: ${cursor || "none"})`,
      );

      const items = await this.db.githubCommit.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { date: "desc" },
        ...githubCommitWithRelationsQuery,
      });

      let nextCursor: string | undefined = undefined;

      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items: z.array(GithubCommitSchema).parse(items),
        nextCursor,
      };
    });
  }
}
