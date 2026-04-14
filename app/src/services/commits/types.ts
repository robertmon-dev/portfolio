import type {
  GithubCommit,
  ListCommitsInput,
  ListCommitsOutput,
  UpdateGithubCommitInput,
} from "@portfolio/shared";

export interface CommitsListing {
  execute(input: ListCommitsInput): Promise<ListCommitsOutput>;
}

export interface CommitRetrieving {
  execute(id: string): Promise<GithubCommit | null>;
}

export interface CommitDeleting {
  execute(ids: string[]): Promise<void>;
}

export interface CommitUpdating {
  execute(input: UpdateGithubCommitInput): Promise<GithubCommit>;
}
