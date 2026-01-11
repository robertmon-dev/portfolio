import { z } from 'zod';
import * as s from '../schemas/github';

export type GithubStats = z.infer<typeof s.GithubStatsSchema>;
export type GithubRepo = z.infer<typeof s.GithubRepoSchema>;
