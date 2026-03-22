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

    const projectKeys = updated.project
      ? [
          `project:id:${updated.project.id}`,
          `project:slug:${updated.project.slug}`,
        ]
      : [];

    await Promise.all([
      this.cache.del("github:repos:list:all"),
      this.cache.del("github:repos:*"),
      this.cache.del("github:stats:*"),
      this.cache.del("projects:list:*"),
      ...projectKeys.map((key) => this.cache.del(key)),
    ]);

    this.logger.info(
      `Successfully updated repo ${updated.name} and invalidated related caches.`,
    );

    return updated;
  }
}
