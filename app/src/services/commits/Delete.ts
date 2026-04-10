import { BaseService } from "../service";
import { CommitDeleting } from "./types";

export class DeleteCommitService extends BaseService implements CommitDeleting {
  public async execute(ids: string[]): Promise<void> {
    this.logger.warn(`Atomic hard-delete for GitHub repos: ${ids}`);

    const commitsToDelete = await this.db.githubCommit.findMany({
      where: { id: { in: ids } },
      select: { id: true, repoId: true },
    });

    await this.db.githubCommit.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    await this.invalidateCommitsCache(...commitsToDelete);

    this.logger.info(`GitHub commit delelted and associated cache cleared`);
  }
}
