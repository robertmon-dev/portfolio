import { BaseService } from "../service";
import { githubRepoWithRelationsQuery } from "./queries";

export class LinkRepoProjectService extends BaseService {
  public async execute(input: { repoId: string; projectId: string }) {
    const { repoId, projectId } = input;

    const { updatedRepo, project } = await this.db.$transaction(async (tx) => {
      const p = await tx.project.findUniqueOrThrow({
        where: { id: projectId },
        select: { slug: true },
      });

      const updated = await tx.githubRepo.update({
        where: { id: repoId },
        data: { project: { connect: { id: projectId } } },
        ...githubRepoWithRelationsQuery,
      });

      return { updatedRepo: updated, project: p };
    });

    await Promise.all([
      this.cache.del("projects:list:*"),
      this.cache.del("github:repos:list:all"),
      this.cache.del(`project:id:${projectId}`),
      this.cache.del(`project:slug:${project.slug}`),
    ]);

    return updatedRepo;
  }
}
