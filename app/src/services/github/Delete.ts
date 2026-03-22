import { BaseService } from "../service";
import { githubRepoWithRelationsQuery } from "./queries";

export class DeleteGithubRepoService extends BaseService {
  public async execute(id: string): Promise<void> {
    this.logger.warn(`Atomic hard-delete for GitHub repo: ${id}`);

    const deleted = await this.db.githubRepo.delete({
      where: { id },
      ...githubRepoWithRelationsQuery,
    });

    const projectKeys = deleted.project
      ? [
          `project:id:${deleted.project.id}`,
          `project:slug:${deleted.project.slug}`,
        ]
      : [];

    await Promise.all([
      this.cache.del("github:repos:list:all"),
      this.cache.del("github:stats:*"),
      this.cache.del("projects:list:*"),
      ...projectKeys.map((key) => this.cache.del(key)),
    ]);

    this.logger.info(
      `GitHub repo and associated cache cleared for: ${deleted.name}`,
    );
  }
}
