import { BaseService } from "../service";
import { CommitDeleting } from "./types";

export class DeleteCommitService
  extends BaseService<string[], void>
  implements CommitDeleting
{
  public async execute(ids: string[]): Promise<void> {
    this.logger.warn(`Atomic hard-delete for GitHub repos: ${ids}`);

    const deleted = await this.db.$transaction(async (tx) => {
      const commitsToDelete = await tx.githubCommit.findMany({
        where: { id: { in: ids } },
        select: { id: true, repoId: true },
      });

      await tx.githubCommit.deleteMany({
        where: {
          id: { in: ids },
        },
      });

      return commitsToDelete;
    });

    await this.cacheInvalidator.invalidateCommitsCache(...deleted);

    this.logger.info(`GitHub commit delelted and associated cache cleared`);
  }
}
