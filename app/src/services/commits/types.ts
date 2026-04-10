import type { GithubCommit } from "@portfolio/shared";

export interface CommitsListing {
  execute(): Promise<GithubCommit[]>;
}

export interface CommitRetrieving {
  execute(id: string): Promise<GithubCommit | null>;
}
