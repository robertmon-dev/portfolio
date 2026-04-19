import { GithubRepo } from "@prisma/client";
import { BaseService } from "../service";
import { githubRepoWithRelationsQuery } from "./queries";

export class DeleteGithubRepoService extends BaseService {
  public async execute(id: string): Promise<GithubRepo> {
    this.logger.warn(`Atomic hard-delete for GitHub repo: ${id}`);

    const deleted = await this.db.githubRepo.delete({
      where: { id },
      ...githubRepoWithRelationsQuery,
    });

    await Promise.all([
      this.invalidateGithubCache(deleted),
      this.invalidateProjectCache(deleted.project),
    ]);

    this.logger.info(
      `GitHub repo and associated cache cleared for: ${deleted.name}`,
    );

    return deleted;
  }
}
