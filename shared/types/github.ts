import { z } from "zod";
import * as g from "../schemas/github";

export type GithubStats = z.infer<typeof g.GithubStatsSchema>;
export type GithubCommit = z.infer<typeof g.GithubCommitSchema>;
export type GithubRepo = z.infer<typeof g.GithubRepoSchema>;
export type UpdateGithubRepoInput = z.infer<
  typeof g.UpdateGithubRepoInputSchema
>;
export type LinkRepoProjectInput = z.infer<typeof g.LinkRepoProjectInputSchema>;
export type ListCommitsInput = z.infer<typeof g.ListCommitsInputSchema>;
export type ListCommitsOutput = z.infer<typeof g.ListCommitsOutputSchema>;
