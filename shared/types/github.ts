import { z } from 'zod';
import * as g from '../schemas/github';

export type GithubStats = z.infer<typeof g.GithubStatsSchema>;
export type GithubRepo = z.infer<typeof g.GithubRepoSchema>;
export type UpdateGithubRepoInput = z.infer<typeof g.UpdateGithubRepoInputSchema>;
export type LinkRepoProjectInput = z.infer<typeof g.LinkRepoProjectInputSchema>;
