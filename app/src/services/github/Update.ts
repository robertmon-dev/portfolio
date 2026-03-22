import { BaseService } from "../service";
import { UpdateGithubRepoInput } from "@portfolio/shared";
import {
  githubRepoWithRelationsQuery,
  type GithubRepoWithRelations,
} from "./queries";

export class UpdateGithubRepoService extends BaseService {
  public async execute(
    input: UpdateGithubRepoInput,
  ): Promise<GithubRepoWithRelations> {
    const { id, ...data } = input;

    this.logger.info(`Updating GitHub repo: ${id}`);

    const updated = await this.db.githubRepo.update({
      where: { id },
      data,
      ...githubRepoWithRelationsQuery,
    });

    await Promise.all([
      this.invalidateGithubCache(updated),
      this.invalidateProjectCache(updated.project),
    ]);

    this.logger.info(
      `Successfully updated repo ${updated.name} and invalidated related caches.`,
    );

    return updated;
  }
}
