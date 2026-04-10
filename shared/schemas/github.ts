import { z } from "zod";
import { zUuid, zString, zUrl, zText, zDateOrString } from "./generic";
import { UserPublicSchema } from "./user";

export const GithubRepoSchema = z.object({
  id: zUuid,
  name: zString,
  url: zUrl,
  stars: z.number(),
  language: zString.nullable(),
  description: zText.nullable(),
  project: z
    .object({
      id: zUuid,
      title: zString,
    })
    .nullable()
    .optional(),
});

export const GithubCommitSchema = z.object({
  id: zUuid,
  sha: zString.nullable(),
  message: zText,
  description: zText.nullable(),
  url: zUrl.nullable(),
  date: zDateOrString,
  user: UserPublicSchema.optional(),
  repo: GithubRepoSchema.optional(),
  createdAt: zDateOrString,
  updatedAt: zDateOrString,
});

export const UpdateGithubRepoInputSchema = z.object({
  id: zUuid,
  name: zString.min(1).optional(),
  stars: z.number().int().nonnegative().optional(),
  language: zString.nullable().optional(),
  description: zText.nullable().optional(),
  order: z.number().int().optional(),
});

export const LinkRepoProjectInputSchema = z.object({
  repoId: zUuid,
  projectId: zUuid,
});

export const GithubStatsSchema = z.object({
  id: zUuid,
  username: zString,
  followers: z.number(),
  publicRepos: z.number(),
  totalStars: z.number(),
  repos: z.array(GithubRepoSchema),
  updatedAt: zDateOrString,
});

export const ListCommitsInputSchema = z.object({
  limit: z.number().min(1).max(50).default(5),
  cursor: zString.optional(),
});

export const ListCommitsOutputSchema = z.object({
  items: z.array(GithubCommitSchema),
  nextCursor: zString.optional(),
});
