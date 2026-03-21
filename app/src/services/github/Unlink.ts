import { BaseService } from "../service";

export class UnlinkRepoProjectService extends BaseService {
  public async execute(repoId: string) {
    this.logger.info(`Unlinking project from repo ${repoId}`);

    const updatedRepo = await this.db.githubRepo.update({
      where: { id: repoId },
      data: {
        project: {
          disconnect: true,
        },
      },
    });

    await Promise.all([
      this.cache.del("projects:list:*"),
      this.cache.del("github:repos:list:all"),
    ]);

    this.logger.info(`Successfully unlinked project from repo ${repoId}`);

    return updatedRepo;
  }
}
