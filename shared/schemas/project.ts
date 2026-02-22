import { z } from 'zod';
import { TechStackSchema } from './techStack';
import { GithubRepoSchema } from './github';

export const ProjectImageSchema = z.object({
  id: z.string().uuid(),
  url: z.string().url(),
  alt: z.string().nullable(),
  order: z.number(),
  projectId: z.string().uuid(),
});

export const ProjectSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  content: z.string().nullable(),
  imageUrl: z.string().url().nullable(),
  demoUrl: z.string().url().nullable(),
  githubRepoId: z.string().uuid().nullable(),
  isFeatured: z.boolean(),
  isVisible: z.boolean(),
  createdAt: z.date().or(z.string())
});

export const CreateProjectSchema = ProjectSchema.omit({
  id: true,
  createdAt: true,
  githubRepoId: true
}).extend({
  techStackIds: z.array(z.string().uuid()).optional(),
  githubRepoId: z.string().uuid().nullable().optional(),
});

export const UpdateProjectSchema = CreateProjectSchema.partial().extend({ id: z.string().uuid() });
export const ProjectWithRelationsSchema = ProjectSchema.extend({
  techStack: z.array(TechStackSchema).optional(),
  gallery: z.array(ProjectImageSchema).optional(),
  githubRepo: GithubRepoSchema.nullable().optional(),
});

export const DeleteProjectSchema = z.object({
  id: z.string().uuid(),
});

export const ListProjectsOptionsSchema = z.object({
  onlyVisible: z.boolean().optional(),
  onlyFeatured: z.boolean().optional(),
});
