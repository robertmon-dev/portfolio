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
  sha: zString,
  message: zText,
  description: zText,
  url: zUrl,
  date: zDateOrString,
  user: UserPublicSchema.nullable(),
  repo: GithubRepoSchema.nullable(),
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
