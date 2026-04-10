import type { GithubCommit } from "@portfolio/shared";

export interface CommitsListing {
  execute(): Promise<GithubCommit[]>;
}
