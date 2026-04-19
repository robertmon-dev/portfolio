import { BaseService } from "../service";
import { githubRepoWithRelationsQuery } from "./queries";
import { TRPCError } from "@trpc/server";

export class UnlinkRepoProjectService extends BaseService {
  public async execute(repoId: string) {
    await this.db.$transaction(async (tx) => {
      const targetRepo = await tx.githubRepo.findUnique({
        where: { id: repoId },
        ...githubRepoWithRelationsQuery,
      });

      if (targetRepo === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Record not found for deletion or update.",
          cause: "No such repository",
        });
      }

      if (targetRepo?.project === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Record not found for deletion or update.",
          cause: "No project repository relation",
        });
      }

      const updated = await tx.githubRepo.update({
        where: { id: repoId },
        data: { project: { disconnect: true } },
      });

      await Promise.all([
        this.invalidateGithubCache(updated),
        this.invalidateProjectCache(targetRepo.project),
      ]);
    });
  }
}
