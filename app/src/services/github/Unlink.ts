import { BaseService } from "../service";
import { githubRepoWithRelationsQuery } from "./queries";

export class UnlinkRepoProjectService extends BaseService {
  public async execute(repoId: string) {
    const updated = await this.db.githubRepo.update({
      where: { id: repoId },
      data: { project: { disconnect: true } },
      ...githubRepoWithRelationsQuery,
    });

    const projectKeys = updated.project
      ? [
          `project:id:${updated.project.id}`,
          `project:slug:${updated.project.slug}`,
        ]
      : [];

    await Promise.all([
      this.cache.del("projects:list:*"),
      this.cache.del("github:repos:list:all"),
      ...projectKeys.map((key) => this.cache.del(key)),
    ]);

    return updated;
  }
}
