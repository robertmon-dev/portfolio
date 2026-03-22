import { BaseService } from "../service";
import { githubRepoWithRelationsQuery } from "./queries";

export class UnlinkRepoProjectService extends BaseService {
  public async execute(repoId: string) {
    const updated = await this.db.githubRepo.update({
      where: { id: repoId },
      data: { project: { disconnect: true } },
      ...githubRepoWithRelationsQuery,
    });

    await Promise.all([
      this.invalidateGithubCache(updated),
      this.invalidateProjectCache(updated.project),
    ]);

    return updated;
  }
}
