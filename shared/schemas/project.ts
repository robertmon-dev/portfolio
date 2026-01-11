import { z } from 'zod';
import { TechStackSchema } from './techStack';

export const ProjectImageSchema = z.object({
  id: z.string().uuid(),
  url: z.string().url(),
  alt: z.string().nullable(),
  order: z.number().default(0),
  projectId: z.string().uuid(),
});

export const ProjectSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string(),
  content: z.string().nullable(),
  imageUrl: z.string().url().nullable(),
  demoUrl: z.string().url().nullable(),
  repoUrl: z.string().url().nullable(),
  isFeatured: z.boolean().default(false),
  isVisible: z.boolean().default(true),
  createdAt: z.date().or(z.string()),
});

export const CreateProjectSchema = ProjectSchema.omit({ id: true, createdAt: true });
export const UpdateProjectSchema = ProjectSchema.partial().extend({ id: z.string().uuid() });

export const ProjectWithRelationsSchema = ProjectSchema.extend({
  techStack: z.array(TechStackSchema).optional(),
  gallery: z.array(ProjectImageSchema).optional(),
});
