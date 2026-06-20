import { BaseService } from "../service";
import { githubCommitWithRelationsQuery } from "./queries";
import type { UpdateGithubCommitInput, GithubCommit } from "@portfolio/shared";

export class UpdateCommitService extends BaseService<
  UpdateGithubCommitInput,
  GithubCommit
> {
  public async execute(input: UpdateGithubCommitInput): Promise<GithubCommit> {
    const { id, ...rest } = input;

    const updated = await this.db.githubCommit.update({
      where: { id: id },
      data: {
        ...rest,
      },
      ...githubCommitWithRelationsQuery,
    });

    this.cacheInvalidator.invalidateCommitsCache(updated);

    return updated;
  }
}
