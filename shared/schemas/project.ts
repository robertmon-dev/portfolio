import { z } from "zod";
import { TechStackSchema } from "./techStack";
import { GithubRepoSchema } from "./github";

export const ProjectImageSchema = z.object({
  id: z.uuid(),
  url: z.url(),
  alt: z.string().nullable(),
  order: z.number(),
  projectId: z.uuid(),
});

export const ProjectSchema = z.object({
  id: z.uuid(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  content: z.string().optional(),
  imageUrl: z.url().optional(),
  demoUrl: z.url().optional(),
  githubRepoId: z.uuid().nullable(),
  isFeatured: z.boolean(),
  isVisible: z.boolean(),
  createdAt: z.date().or(z.string()),
});

export const CreateProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  content: z.string().optional(),
  imageUrl: z.url().optional(),
  demoUrl: z.url().optional(),
  isFeatured: z.boolean(),
  isVisible: z.boolean(),
  techStackIds: z.array(z.uuid()).optional(),
  githubRepoId: z.uuid().nullable().optional(),
});

export const UpdateProjectSchema = CreateProjectSchema.partial().extend({
  id: z.uuid(),
});

export const ProjectWithRelationsSchema = ProjectSchema.extend({
  techStack: z.array(TechStackSchema).optional(),
  gallery: z.array(ProjectImageSchema).optional(),
  githubRepo: GithubRepoSchema.nullable().optional(),
});

export const DeleteProjectSchema = z.object({
  id: z.uuid(),
});

export const ListProjectsOptionsSchema = z.object({
  onlyVisible: z.boolean().optional(),
  onlyFeatured: z.boolean().optional(),
});
