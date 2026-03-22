import { z } from "zod";

export const GithubRepoSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  url: z.url(),
  stars: z.number(),
  language: z.string().nullable(),
  description: z.string().nullable(),
  project: z
    .object({
      id: z.uuid(),
      title: z.string(),
    })
    .nullable()
    .optional(),
});

export const UpdateGithubRepoInputSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1).optional(),
  stars: z.number().int().nonnegative().optional(),
  language: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  order: z.number().int().optional(),
});

export const LinkRepoProjectInputSchema = z.object({
  repoId: z.uuid(),
  projectId: z.uuid(),
});

export const GithubStatsSchema = z.object({
  id: z.uuid(),
  username: z.string(),
  followers: z.number(),
  publicRepos: z.number(),
  totalStars: z.number(),
  repos: z.array(GithubRepoSchema),
  updatedAt: z.date().or(z.string()),
});
