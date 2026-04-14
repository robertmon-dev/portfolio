import { BaseService } from "../service";
import { githubCommitWithRelationsQuery } from "./queries";
import type { UpdateGithubCommitInput, GithubCommit } from "@portfolio/shared";

export class UpdateCommitService extends BaseService {
  public async execute(input: UpdateGithubCommitInput): Promise<GithubCommit> {
    const { id, ...rest } = input;

    const updated = await this.db.githubCommit.update({
      where: { id: id },
      data: {
        ...rest,
      },
      ...githubCommitWithRelationsQuery,
    });

    this.invalidateCommitsCache(updated);

    return updated;
  }
}
