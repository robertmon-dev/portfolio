import { z } from "zod";
import { TechStackSchema } from "./techStack";
import { GithubRepoSchema } from "./github";
import {
  zUuid,
  zString,
  zUrl,
  zText,
  zContent,
  zDateOrString,
  zSafeArray,
} from "./generic";

export const ProjectImageSchema = z.object({
  id: zUuid,
  url: zUrl,
  alt: zString.nullable(),
  order: z.number(),
  projectId: zUuid,
});

export const ProjectSchema = z.object({
  id: zUuid,
  slug: zString,
  title: zString,
  description: zText,
  content: zContent.optional(),
  imageUrl: zUrl.optional(),
  demoUrl: zUrl.optional(),
  githubRepoId: zUuid.nullable().optional(),
  isFeatured: z.boolean(),
  isVisible: z.boolean(),
  createdAt: zDateOrString,
});

export const CreateProjectSchema = z.object({
  slug: zString,
  title: zString,
  description: zText,
  content: zContent.optional(),
  imageUrl: zUrl.optional(),
  demoUrl: zUrl.optional(),
  isFeatured: z.boolean(),
  isVisible: z.boolean(),
  techStackIds: zSafeArray(zUuid, 50).optional(),
  githubRepoId: zUuid.nullable().optional(),
});

export const UpdateProjectSchema = CreateProjectSchema.partial().extend({
  id: zUuid,
});

export const ProjectWithRelationsSchema = ProjectSchema.extend({
  techStack: zSafeArray(TechStackSchema, 50).optional(),
  gallery: zSafeArray(ProjectImageSchema, 20).optional(),
  githubRepo: GithubRepoSchema.nullable().optional(),
});

export const DeleteProjectSchema = z.object({
  id: zUuid,
});

export const ListProjectsOptionsSchema = z.object({
  onlyVisible: z.boolean().optional(),
  onlyFeatured: z.boolean().optional(),
});
