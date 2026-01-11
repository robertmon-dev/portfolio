import { z } from 'zod';

export const GithubRepoSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  stars: z.number(),
  language: z.string().nullable(),
  description: z.string().nullable(),
});

export const GithubStatsSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  followers: z.number(),
  publicRepos: z.number(),
  totalStars: z.number(),
  topRepos: z.array(GithubRepoSchema),
  updatedAt: z.date().or(z.string()),
});
