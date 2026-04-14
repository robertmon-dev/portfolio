import { TRPCError } from "@trpc/server";
import { BaseService } from "../service";
import { githubCommitWithRelationsQuery } from "./queries";
import type { LinkGithubCommitInput, GithubCommit } from "@portfolio/shared";

export class LinkGithubCommitService extends BaseService {
  public async execute(input: LinkGithubCommitInput): Promise<GithubCommit> {
    const { githubCommitId, githubRepoId } = input;

    const updated = await this.db.$transaction(async (tx) => {
      const repo = await tx.githubRepo.findFirst({
        where: { id: githubRepoId },
        select: { id: true },
      });

      if (!repo) {
        this.logger.error(
          `Repository with ${githubRepoId} have not been found`,
        );
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Repository with ID ${githubRepoId} not found`,
        });
      }

      return await tx.githubCommit.update({
        where: { id: githubCommitId },
        data: { repoId: githubRepoId },
        ...githubCommitWithRelationsQuery,
      });
    });

    await this.invalidateCommitsCache(updated);
    await this.invalidateGithubCache(updated.repo);

    return updated;
  }
}
