import { BaseService } from "../service";
import type { LinkRepoProjectInput } from "@portfolio/shared";
import { githubRepoWithRelationsQuery } from "./queries";

export class LinkRepoProjectService extends BaseService {
  public async execute(input: LinkRepoProjectInput) {
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
      this.invalidateGithubCache(updatedRepo),
      this.invalidateProjectCache({ id: projectId, slug: project.slug }),
    ]);

    return updatedRepo;
  }
}
